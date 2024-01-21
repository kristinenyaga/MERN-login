import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'

import env from "../config.js"

const transporter = nodemailer.createTransport({
  service:'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: env.EMAIL,
    pass: env.PASSWORD
  },
});



export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;
  const mailOptions = {
    from: {
      name: "kristine nyaga",
      email: env.EMAIL,
    },
    to: userEmail,
    subject: 'one time password',
    text: `Hello ${username}, ${text} `,
  }
  
 
transporter
  .sendMail(mailOptions)
  .then(() => {
    return res.status(200).send({ msg: "You should receive an email from us" });
  })
  .catch((error) => {
    return res
      .status(500)
      .send({ error: "Email not found", details: error.message });
  });
  
}


