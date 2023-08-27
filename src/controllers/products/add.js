const { Product } = require("../../models");

const add = async (req, res) => {
  const { _id } = req.user;
  const product = await Product.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    payload: {
      product,
    },
  });
};
module.exports = add;
