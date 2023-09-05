const app = require("./src/app");
const mongoose = require("mongoose");
const crateFolderNotExist = require("./src/helpers/createFolder");
mongoose.set("strictQuery", true);
require("dotenv").config();
const path = require("path");

const { DB_HOST } = process.env;
const { PORT = 4040 } = process.env;
const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      crateFolderNotExist(UPLOAD_DIR);
      console.log(`Database connection successful on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
