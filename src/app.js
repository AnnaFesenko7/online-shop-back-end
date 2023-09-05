const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/api/auth");
const productsRouter = require("./routes/api/products");
const usersRouter = require("./routes/api/users");

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../src/swagger.json");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, status });
});

module.exports = app;

const mail = {
  to: "annafecenko7@gmail.com",
  from: "annafesenko7@meta.ua",
  subject: "mail for registration",
  html: "<p>click here for registration</p>",
};

const nodemailer = require("nodemailer");
const { META_PASSWORD } = process.env;
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2255
  secure: true,
  auth: {
    user: "annafesenko7@meta.ua",
    pass: META_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
const transporter = nodemailer.createTransport(nodemailerConfig);

transporter
  .sendMail(mail)
  .then(() => console.log("Verification email sent"))
  .catch((error) => console.log(error.message));
