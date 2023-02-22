const { Schema, model } = require("mongoose");
const Joi = require("joi");
const codeRegexp =
  /^[a-z|0-9|A-Z]*([_][a-z|0-9|A-Z]+)*([.][a-z|0-9|A-Z]+)*([.][a-z|0-9|A-Z]+)*(([_][a-z|0-9|A-Z]+)*)?@[a-z][a-z|0-9|A-Z]*\.([a-z][a-z|0-9|A-Z]*(\.[a-z][a-z|0-9|A-Z]*)?)$/;
const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: codeRegexp,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const usersRegisterSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  repeat_password: Joi.ref("password"),
  email: Joi.string().pattern(codeRegexp).required(),
});

const usersLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(codeRegexp).required(),
});

module.exports = {
  User,
  usersRegisterSchema,
  usersLoginSchema,
};
