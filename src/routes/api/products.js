const express = require("express");
const router = express.Router();
const { products: ctrl } = require("../../controllers");
const { joiSchema, ratingJoiSchema } = require("../../models/product");
const { validationBody, ctrlWrapper } = require("../../middlewares");

router.get("/", ctrlWrapper(ctrl.getAll));
router.post("/", validationBody(joiSchema), ctrlWrapper(ctrl.add));
router.get("/:id", ctrlWrapper(ctrl.getById));
router.put("/:id", validationBody(joiSchema), ctrlWrapper(ctrl.updateById));
router.delete("/:id", ctrlWrapper(ctrl.removeById));
router.patch(
  "/:id/rating",
  validationBody(ratingJoiSchema),
  ctrlWrapper(ctrl.updateRating)
);
module.exports = router;
