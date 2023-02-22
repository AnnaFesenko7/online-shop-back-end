const { Product } = require("../../models");
const { NotFound } = require("http-errors");

const updateRating = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  const result = await Product.findByIdAndUpdate(id, { rating }, { new: true });
  if (!result) {
    throw NotFound(`Product with id ${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateRating;
