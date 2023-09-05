const multer = require("multer");
const path = require("path");
require("dotenv").config();
const sharp = require("../../");

const tempDir = path.join(__dirname, "../../", process.env.UPLOAD_DIR);

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (reg, file, cb) => {
    cb(null, "image.jpg");
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);

      return;
    }
    cb(null, false);
  },
});

module.exports = upload;
