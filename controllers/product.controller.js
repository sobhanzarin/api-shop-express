const {
  createProductService,
  getProductsService,
  findProductByIdService,
  deleteProductServices,
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
    const result = await createProductService(data);
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
async function findProductByIdHandler(req, res, next) {
  try {
    const { id } = req.params;
    const result = await findProductByIdService(id);
    return res.json({
      error: null,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
async function deleteProductHandler(req, res, next) {
  try {
    const { id } = req.params;
    const result = await deleteProductServices(id);
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
  findProductByIdHandler,
  deleteProductHandler,
};
