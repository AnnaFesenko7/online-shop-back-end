const { Schema, model } = require("mongoose");
const Joi = require("joi");
const path = require("path");

const defaultImgUrl = path.join(process.cwd(), "product", "Rectangle.jpg");

const productSchema = Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productImage: {
      type: Object,
      default: { url: defaultImgUrl },
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdFor: {
      type: Array,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Product = model("product", productSchema);

const joiSchema = Joi.object({
  productName: Joi.string().required(),
  brand: Joi.string().required(),
  price: Joi.number().min(0.01).required(),
  image: Joi.any(),
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  description: Joi.string().required(),
  createdFor: Joi.any().required(),
  tags: Joi.array().required(),
});

module.exports = {
  Product,
  joiSchema,
};
