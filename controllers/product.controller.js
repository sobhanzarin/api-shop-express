const {
  createProductservice,
  getProductsService,
} = require("../services/product.service");

async function createProductHandler(req, res, next) {
  try {
    const {
      title,
      price,
      discount,
      active_discount,
      type,
      count,
      description,
      colors,
      sizes,
      details,
    } = req.body;
    const data = {
      title,
      price,
      discount,
      active_discount,
      type,
      count,
      description,
    };
    const result = await createProductservice(data);
    return res.json({
      error: null,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
async function getProductsHandler(req, res, next) {
  try {
    const result = await getProductsService();
    return res.json({
      error: null,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createProductHandler,
  getProductsHandler,
};
