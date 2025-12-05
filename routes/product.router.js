const {
  createProductHandler,
  getProductsHandler,
} = require("../controllers/product.controller");
const {
  createProductValidation,
} = require("../validations/product.validation");

const router = require("express").Router();

router.post("/", createProductValidation, createProductHandler);
router.get("/", getProductsHandler);

module.exports = {
  productRoutes: router,
};
