const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { validationBody } = require("../../middlewares");

router.post("/register", ctrl.register);
module.exports = router;
