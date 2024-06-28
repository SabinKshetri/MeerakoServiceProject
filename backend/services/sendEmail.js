const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: "Sabin Dangi <sabin@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: "Your Otp is :" + options.otp,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
