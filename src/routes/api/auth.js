const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { validationBody, ctrlWrapper } = require("../../middlewares");
const { usersLoginSchema, usersRegisterSchema } = require("../../models/user");

router.post(
  "/register",
  validationBody(usersRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validationBody(usersLoginSchema),
  ctrlWrapper(ctrl.login)
);
module.exports = router;
