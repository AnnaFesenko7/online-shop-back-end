const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_KEY, SENGRID_VALID_MAIL } = process.env;
sgMail.setApiKey(SENDGRID_KEY);
const mail = {
  to: "annafecenko7@gmail.com",
  from: SENGRID_VALID_MAIL,
  subject: "mail for registration",
  html: "click there for registration",
};

sgMail
  .send(mail)
  .then(() => console.log("succec"))
  .catch((error) => console.log(error.message));
