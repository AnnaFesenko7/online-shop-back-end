const { Product } = require("../../models");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs/promises");
const UPLOAD_DIR = path.join(__dirname, "../../../", process.env.UPLOAD_DIR);
const IMG_DIR = path.join(__dirname, "../../../", "public", "product");

const add = async (req, res) => {
  console.log(req.file);

  // const newimage = await sharp({
  //   create: {
  //     width: 100,
  //     height: 100,
  //     channels: 4,
  //     background: { r: 255, g: 0, b: 0, alpha: 0.5 },
  //   },
  // })
  //   .jpeg()
  //   .toFile(`${IMG_DIR}/newimage.jpg`);

  await sharp(`${UPLOAD_DIR}/image.jpg`)
    .resize(100, 100, {
      fit: "cover",
    })
    .toFile(`${IMG_DIR}/image.jpg`);

  // console.log("🚀 ~ file: add.js:19 ~ add ~ image:", image);

  // fs.writeFile(IMG_DIR, image);
  const product = await Product.create({ ...req.body });
  res.status(201).json({
    status: "success",
    code: 201,
    payload: {
      product,
    },
  });
};
module.exports = add;
