const createHttpError = require("http-errors");
const ProductSize = require("../models/product_size.model");
const Product = require("../models/product.model");
const ProductColor = require("../models/product_color.model");
const ProductDetail = require("../models/product_detail.model");
const ProductSize = require("../models/product_size.model");
const { ProductType } = require("../utils/product.constant");

async function createProductService(data) {
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
  } = data;
  if (!Object.values(ProductType).includes(type)) {
    throw createHttpError(400, "نوع محصول معتبر نمیباشد");
  }
  const product = await Product.create({
    title,
    price,
    discount,
    active_discount,
    type,
    count,
    description,
  });
  if (details && Array.isArray(details)) {
    let detailList = [];
    for (const item of details) {
      detailList.push({
        key: item?.key,
        value: item?.value,
        productId: product.id,
      });
    }
    if (detailList.lengt > 0) {
      const detail = await ProductDetail.bulkCreate(detailList);
    }
  }
  if (type === "coloring") {
    if (colors && Array.isArray(colors)) {
      let colorList = [];
      for (const item of colors) {
        colorList.push({
          color_name: item?.name,
          color_code: item?.code,
          productId: product.id,
          price: item?.price,
          discount: item?.discount,
          count: item?.count,
          active_discount: item?.active_discount,
        });
      }
      if (colorList.lengt > 0) {
        const color = await ProductColor.bulkCreate(colorList);
      }
    }
  }
  if (type === "sizing") {
    if (sizes && Array.isArray(sizes)) {
      let sizeList = [];
      for (const item of sizes) {
        sizeList.push({
          key: item?.key,
          value: item?.value,
          productId: product.id,
        });
      }
      if (sizeList.lengt > 0) {
        const size = await ProductSize.bulkCreate(sizeList);
      }
    }
  }
  return {
    message: "محصول با موفقیت افزوده شده",
  };
}
async function getProductsService() {
  const products = Product.findAll();
  return {
    products,
  };
}

module.exports = {
  createProductservice,
  getProductsService,
};
