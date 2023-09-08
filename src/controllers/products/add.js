const { Product } = require("../../models");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const IMG_DIR = path.join(__dirname, "../../../", "public", "product");

const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

const add = async (req, res) => {
  console.log(req.file);

  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  // await sharp(`${UPLOAD_DIR}/${req.file.originalname}`)
  //   .resize(100, 100, {
  //     fit: "cover",
  //   })
  //   .toFile(`${IMG_DIR}/image.jpg`);

  const uploadCloud = (pathFile) => {
    // return new Promise((resolve, reject) => {
    //   cloudinary.uploader.upload(
    //     pathFile,
    //     { folder: "cosmetics" },
    //     (error, result) => {
    //       console.log(result);
    //       if (error) {
    //         reject(error);
    //       }
    //       if (result) {
    //         resolve(result);
    //       }
    //     }
    //   );
    // });

    return cloudinary.uploader.upload(pathFile, {
      folder: "cosmetics",
      transformation: {
        width: 640,
        crop: "pad",
      },
    });
  };

  const image = await uploadCloud(`${UPLOAD_DIR}/${req.file.originalname}`);

  console.log("🚀 ~ file: add.js:48 ~ add ~ image:", image);

  const product = await Product.create({
    ...req.body,
    image: image,
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
