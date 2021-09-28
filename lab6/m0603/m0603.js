require('dotenv').config()

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_LOGIN,
      pass: process.env.MAIL_PASS
    }
  });

module.exports.send = (message) => {

    return transporter.sendMail({
        from: process.env.MAIL_LOGIN,
        to: process.env.MAIL_LOGIN,
        subject: 'Send message using Nodemailer',
        text: message
    });
};