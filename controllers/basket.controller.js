const { addToBasketServicer } = require("../services/basket.service");

async function addToBasketHandler(req, res, next) {
  try {
    const { id: userId } = req?.user;
    const { productId, colorId, sizeId } = req.body;
    const detials = { productId, colorId, sizeId, userId };
    const result = await addToBasketServicer(detials);
    return res.json({
      error: null,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addToBasketHandler,
};
