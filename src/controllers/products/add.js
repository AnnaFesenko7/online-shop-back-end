const { Product } = require("../../models");
const path = require("path");
const { cloudinaryServices } = require("../../services");
require("dotenv").config();
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

const add = async (req, res) => {
  console.log(req.file);
  console.log(req.body);

  const image = await cloudinaryServices.uploadCloud(
    `${UPLOAD_DIR}/${req.file.originalname}`
  );

  console.log("🚀 ~ file: add.js:48 ~ add ~ image:", image);

  const product = await Product.create({
    ...req.body,
    productImage: image,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    payload: {
      product,
    },
  });
};
module.exports = add;
