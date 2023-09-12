const { Product } = require("../../models");
const { NotFound } = require("http-errors");
const { cloudinaryServices } = require("../../services");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByIdAndDelete(id);

  if (!result) {
    throw NotFound(`Product with id ${id} not found`);
  }

  const public_id = result.productImage.public_id;

  const cloudResult = await cloudinaryServices.deleteCloud(public_id);
  console.log("cloud result", cloudResult);

  res.json({
    status: "product deleted",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = removeById;
