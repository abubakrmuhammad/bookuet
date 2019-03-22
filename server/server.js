/***************************
 * --------------------- *
 * SERVER.JS FOR BOOKUET *
 * --------------------- *
 ***************************/

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
const async = require('async');

const app = express();
const mongoose = require('mongoose');

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DATABASE);

/*********************************
 *          MIDDLEWARES          *
 **********************************/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const { auth } = require('./middlewares/auth');
const { admin } = require('./middlewares/admin');

/*********************************
 *            MODELS             *
 **********************************/

const { User } = require('./models/user');
const { Category } = require('./models/category');
const { Book } = require('./models/book');
const { Site } = require('./models/site');
const { Payment } = require('./models/payment');

/*********************************
 *            UTILS              *
 **********************************/

const { sendEmail } = require('./utils/mail');
const { generatePO } = require('./utils/misc');

/*********************************
 *            BOOKS              *
 **********************************/

app.post('/api/books/shop', (req, res) => {
  let { order, sortBy, limit, skip, filters } = req.body;

  if (!order) order = 'desc';
  if (!sortBy) sortBy = '_id';
  limit = parseInt(limit);
  skip = parseInt(skip);

  let findArgs = {};

  for (const key in filters) {
    if (filters[key].length > 0) {
      if (key === 'price') findArgs[key] = { $gte: filters[key][0], $lte: filters[key][1] };
      else findArgs[key] = filters[key];
    }
  }

  findArgs['publish'] = true;

  Book.find(findArgs)
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, docs) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ size: docs.length, books: docs });
    });
});

app.get('/api/books', (req, res) => {
  let { order, sortBy, limit } = req.query;
  limit = parseInt(limit);

  Book.find()
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, docs) => {
      if (err) return res.status(400).send(err);

      res.status(200).send(docs);
    });
});

app.get('/api/books/book', (req, res) => {
  const id = req.query.id;
  Book.findOne({ _id: id })
    .populate('category')
    .exec((err, doc) => {
      if (err) return res.status(400).send({ success: false, err });

      res.status(200).send(doc);
    });
});

app.get('/api/cart', (req, res) => {
  const ids = req.query.items.split(',').map(item => mongoose.Types.ObjectId(item));

  Book.find({ _id: { $in: ids } })
    .populate('category')
    .exec((err, docs) => {
      if (err) res.status(400).send({ success: false, err });
      res.status(200).send(docs);
    });
});

app.post('/api/book', auth, admin, (req, res) => {
  const book = new Book(req.body);

  book.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({
      success: true,
      book: doc
    });
  });
});

/*********************************
 *          CATEGORIES           *
 **********************************/

app.post('/api/books/category', auth, admin, (req, res) => {
  const category = new Category(req.body);

  category.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({ success: true, category: doc });
  });
});

app.get('/api/books/categories', (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) return res.status(400).send(err);

    res.status(200).send(categories);
  });
});

app.post('/api/books/category/remove', auth, admin, (req, res) => {
  const categoryToRemove = req.body;

  Category.deleteOne({ _id: categoryToRemove._id }, err => {
    if (err) res.status(400).send(err);

    res.status(200).send({ success: true });
  });
});

/*********************************
 *            USERS              *
 **********************************/

app.get('/api/user/auth', auth, (req, res) => {
  const { email, firstname, lastname, role, cart, history } = req.user;

  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email,
    firstname,
    lastname,
    role,
    cart,
    history
  });
});

app.post('/api/user/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    sendEmail(doc.email, doc.firstname, null, 'welcome');

    return res.status(200).json({ success: true });
  });
});

app.post('/api/user/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ loginSuccess: false, message: 'User not found' });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false, message: 'Wrong password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res
          .cookie('w_auth', user.token)
          .status(200)
          .json({ loginSuccess: true });
      });
    });
  });
});

app.get('/api/user/logout', auth, (req, res) => {
  const { _id } = req.user;
  User.findOneAndUpdate({ _id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).send({ success: true });
  });
});

app.post('/api/user/upload_image', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      res.status(200).send({ public_id: result.public_id, url: result.secure_url });
    },
    { public_id: `${Date.now()}`, resource_type: 'auto' }
  );
});

app.get('/api/user/remove_image', auth, admin, (req, res) => {
  const { public_id } = req.query;

  cloudinary.uploader.destroy(public_id, (err, result) => {
    if (err) return res.json({ success: false, err });

    res.status(200).send({ success: true });
  });
});

app.post('/api/user/add_to_cart', auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;

    doc.cart.forEach(item => {
      if (item.id == req.query.bookId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, 'cart.id': mongoose.Types.ObjectId(req.query.bookId) },
        { $inc: { 'cart.$.quantity': 1 } },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.bookId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) res.status(400).json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

app.get('/api/user/remove_from_cart', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: mongoose.Types.ObjectId(req.query.id) } } },
    { new: true },
    (err, userDoc) => {
      if (err) res.status(400).json({ success: false, err });
      const ids = userDoc.cart.map(item => mongoose.Types.ObjectId(item.id));

      Book.find({ _id: { $in: ids } })
        .populate('category')
        .exec((err, cartItems) => {
          if (err) res.status(400).json({ success: false, err });
          res.status(200).json({ cartItems, userCart: userDoc.cart });
        });
    }
  );
});

app.post('/api/user/update_profile', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { $set: req.body }, { new: true }, (err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

app.post('/api/user/buy', auth, (req, res) => {
  const po = generatePO(req.user._id);

  const products = req.body.cartItems.map(item => {
    return {
      porder: po,
      dateOfPurchase: Date.now(),
      title: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity
    };
  });

  const user = {
    id: req.user._id,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email
  };

  const paymentData = { user, products, porder: po };

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: products }, $set: { cart: [] } },
    { new: true },
    (err, userDoc) => {
      if (err) return res.status(400).json({ success: false, err });

      const payment = new Payment(paymentData);
      payment.save((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });

        const products = doc.products.map(item => {
          return { id: item.id, quantity: item.quantity };
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Book.update({ _id: item.id }, { $inc: { sold: item.quantity } }, { new: false }, callback);
          },
          err => {
            if (err) return res.status(400).json({ success: false, err });

            sendEmail(userDoc.email, userDoc.firstname, null, 'purchase', payment);

            res.status(200).json({ success: true, cart: [] });
          }
        );
      });
    }
  );
});

/*********************************
 *             SITE              *
 **********************************/

app.get('/api/site/site_info', (req, res) => {
  Site.findOne({}, (err, site) => {
    if (err) return res.status(400).send({ success: false, err });
    res.status(200).send(site.siteInfo);
  });
});

app.post('/api/site/site_info', auth, admin, (req, res) => {
  Site.findOneAndUpdate({ name: 'site' }, { $set: { siteInfo: req.body } }, { new: true }, (err, doc) => {
    if (err) return res.status(400).send({ success: false, err });
    res.status(200).send({ success: true, siteInfo: doc.siteInfo[0] });
  });
});

const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`Server running at port ${port}`));
