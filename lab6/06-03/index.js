require('dotenv').config()

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_LOGIN,
      pass: process.env.MAIL_PASS
    }
  });
  
  var mailOptions = {
    from: process.env.MAIL_LOGIN,
    to: process.env.MAIL_LOGIN,
    subject: 'Sending Email using Node.js',
  };

module.exports.send = (message) => {
    mailOptions.text = message;

    transporter.sendMail(mailOptions, (error, info) => {
        console.log(error ?? info.response);
    });
 
};