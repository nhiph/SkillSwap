const nodemailer = require("nodemailer");

const sendActivationEmail = async (email, activationToken) => {
  console.log('email', email)
  // Create a transporter using SMTP or any email service provider
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or use another email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const activationLink = `${process.env.FRONTEND_URL}/activate/${activationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Account Activation",
    text: `Please click on the following link to activate your account: ${activationLink}`,
  };

  console.log('mailOptions', mailOptions)

  await transporter.sendMail(mailOptions);
};

module.exports = { sendActivationEmail };
