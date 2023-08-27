const { Product } = require("../../models");

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  // const { _id } = req.user;
  // const result = await Product.find({ owner: _id }, "", {
  //   skip,
  //   limit: Number(limit),
  // }).populate("owner", "_id name email");
  const products = await Product.find({}, "", { skip, limit: Number(limit) });
  res.status(200).json({
    status: "success",
    code: 200,
    payload: {
      products,
    },
  });
};
module.exports = getAll;
