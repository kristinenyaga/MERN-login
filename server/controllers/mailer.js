import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'

import env from "../config.js"

  let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: env.EMAIL, // generated ethereal user
      pass: env.PASSWORD, // generated ethereal password
    },
  }

let transporter = nodemailer.createTransport(nodeConfig)
  
let mailGenerator = new Mailgen({
  theme: "default",
  product: {
    // Appears in header & footer of e-mails
    name: "Mailgen",
    link: "https://mailgen.js/",
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  },
});


export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  //body of email
  var email = {
    body: {
      name: username,
      intro:
        text || "Welcome to sasalink! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  // Generate an HTML email with the provided contents
  var emailBody = mailGenerator.generate(email);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  var emailText = mailGenerator.generatePlaintext(email);
  let message = {
    from: env.EMAIL,
    to: userEmail,
    subject: subject || "Sign Up successful",
    html:emailBody
  }
  //send mail
  transporter.sendMail(message)
    .then(() => {
      return res.status(200).send({msg:"You should receive an email from us"})
    })
    .catch(error => res.status(500).send(error))
  
}


