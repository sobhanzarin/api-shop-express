const { DataTypes, Model } = require("@sequelize/core");
const sequelize = require("../config/db.config");
const { ProductType } = require("../utils/product.constant");

class Product extends Model {}
Product.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    discount: { type: DataTypes.INTEGER, allowNull: true },
    active_discount: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    type: { type: DataTypes.ENUM(...Object.values(ProductType)) },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "product",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Product;
