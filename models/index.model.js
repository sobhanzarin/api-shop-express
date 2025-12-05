const sequelize = require("../config/db.config");
const Product = require("./product.model");
const ProductColor = require("./product_color.model");
const ProductDetail = require("./product_detail.model");
const ProductSize = require("./product_size.model");

// product -> product details
Product.hasMany(ProductDetail, {
  as: "details",
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
  },
});
ProductDetail.belongsTo(Product, {
  as: "product",
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
  },
});

// product -> product color
Product.hasMany(ProductColor, {
  as: "colors",
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
  },
});
ProductColor.belongsTo(Product, {
  as: "product",
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
  },
});

// product -> product size
Product.hasMany(ProductSize, {
  as: "sizes",
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
  },
});
ProductSize.belongsTo(Product, {
  as: "product",
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
  },
});

const syncModel = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  syncModel,
  Product,
  ProductColor,
  ProductDetail,
  ProductSize,
};
