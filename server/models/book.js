const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 500
    },
    author: {
      required: true,
      type: String,
      maxlength: 100
    },
    description: {
      required: true,
      type: String,
      maxlength: 100000
    },
    price: {
      required: true,
      type: Number,
      maxlength: 255
    },
    category: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    available: {
      required: true,
      type: Boolean
    },
    shipping: {
      required: true,
      type: Boolean
    },
    sold: {
      type: Number,
      default: 0,
      maxlength: 100
    },
    publish: {
      required: true,
      type: Boolean
    },
    images: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = {
  Book
};
