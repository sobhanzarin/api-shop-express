const { DataTypes } = require("@sequelize/core");
const { sequelize } = require("../config/db.config");
const { ProductType } = require("../utils/product.constant");

const ProductDetail = sequelize.define(
  "product_detail",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    key: { type: DataTypes.STRING },
    value: { type: DataTypes.STRING },
    productId: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    modelName: "product_detail",
  }
);

module.exports = ProductDetail;
