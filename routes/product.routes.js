const {
  createProductHandler,
  getProductsHandler,
  findProductByIdHandler,
} = require("../controllers/product.controller");
const {
  createProductValidation,
} = require("../validations/product.validation");

const router = require("express").Router();

router.post("/", createProductValidation, createProductHandler);
router.get("/", getProductsHandler);
router.get("/:id", findProductByIdHandler);
router.delete("/:id", getProductsHandler);

module.exports = {
  productRoutes: router,
};
