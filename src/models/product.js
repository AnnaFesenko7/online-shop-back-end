const { Schema, model } = require("mongoose");
const Joi = require("joi");
const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Product = model("product", productSchema);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0.01).required(),
  rating: Joi.number().min(0.01),
});
const ratingJoiSchema = Joi.object({
  rating: Joi.number().min(0.01).required(),
});
module.exports = {
  Product,
  joiSchema,
  ratingJoiSchema,
};
