const mailer = require('nodemailer');
const { welcome, purchase } = require('./templates');

require('dotenv').config();

const getEmailTemplate = (to, name, token, templateType, data) => {
  let mail;
  const from = 'Bookuet <bookuetmessagecenter@gmail.com>';

  switch (templateType) {
    case 'welcome':
      mail = {
        from,
        to,
        subject: `Welcome to Bookuet ${name}`,
        html: welcome()
      };
      break;
    case 'purchase':
      mail = {
        from,
        to,
        subject: `Thanks for shopping with us ${name}`,
        html: purchase(data)
      };
    break;
    default:
      mail = null;
  }

  return mail;
};

const sendEmail = (to, name, token, type, data = null) => {

  const smtpTransport = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'bookuetmessagecenter@gmail.com',
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getEmailTemplate(to, name, token, type, data);

  smtpTransport.sendMail(mail, (err, res) => {
    if (err) console.log(err);
    else console.log('Email Sent');

    smtpTransport.close();
  });
};

module.exports = { sendEmail };
