const { Product } = require("../../models");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw NotFound(`Product with id ${id} not found`);
  }
  res.json({
    status: "product deleted",
    code: 204,
    data: {
      result,
    },
  });
};

module.exports = removeById;
