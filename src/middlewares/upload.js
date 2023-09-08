const multer = require("multer");
const path = require("path");
require("dotenv").config();
const sharp = require("../../");

const tempDir = path.join(process.cwd(), process.env.UPLOAD_DIR);

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
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
