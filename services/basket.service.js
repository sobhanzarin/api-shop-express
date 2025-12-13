const createHttpError = require("http-errors");
const productModel = require("../models/product.model");
const productColorModel = require("../models/product_color.model");
const productSizeModel = require("../models/product_size.model");
const { ProductType } = require("../utils/product.constant");
const Basket = require("../models/basket.model");

async function addToBasketServicer(detials) {
  const { productId, colorId, sizeId, userId } = detials;
  const product = await productModel.findByPk(productId);
  if (!product) throw createHttpError(404, "محصول مورد نظر یافت");

  const basketWhere = { productId, userId };
  let availableCount;
  let variantKey;

  switch (product.type) {
    case ProductType.Coloring: {
      if (!colorId) throw createHttpError(400, "رنگ را وارد کنید");
      const color = await productColorModel.findByPk(colorId);
      if (!color) throw createHttpError(404, "رنگ وجود ندارد");

      availableCount = color.count;
      variantKey = "colorId";
      basketWhere.colorId = colorId;
      break;
    }
    case ProductType.Sizing: {
      if (!sizeId) throw createHttpError(400, "سایز را وارد کنید");

      const size = await productSizeModel.findByPk(sizeId);
      if (!size) throw createHttpError(404, "سایز وجود ندارد");

      availableCount = size.count;
      variantKey = "sizeId";
      basketWhere.sizeId = sizeId;
      break;
    }

    default:
      {
        availableCount = product.count;
      }

      if (availableCount <= 0) {
        throw createHttpError(400, "محصول در انبار موجود نیست");

        const basket = await Basket.findOne({ where: basketWhere });

        if (basket) {
          if (basket.count >= availableCount)
            throw createHttpError(
              400,
              "بیش از موجودی انبار نمی‌توانید اضافه کنید"
            );

          basket.count += 1;
          await basket.save();
        } else {
          await Basket.create({ ...basketWhere, count: 1 });
        }

        return { message: "افزودن به سبد خرید با موفقیت انجام شد" };
      }
  }
}

module.exports = {
  addToBasketServicer,
};
