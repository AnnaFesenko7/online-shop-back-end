const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
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

const deleteCloud = (public_id) => {
  return cloudinary.api.delete_resources([public_id]);
};

module.exports = {
  uploadCloud,
  deleteCloud,
};
