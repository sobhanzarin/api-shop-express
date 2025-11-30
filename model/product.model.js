const { DataTypes } = require("@sequelize/core");
const { sequelize } = require("../config/db.config");
const { ProductType } = require("../utils/product.constant");

const Product = sequelize.define(
  "product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    discount: { type: DataTypes.INTEGER, allowNull: true },
    active_discoint: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    type: { type: DataTypes.ENUM(...Object.values(ProductType)) },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.TEXT },
  },
  {
    modelName: "product",
    createdAt: "created_at",
    updatedAt: ":updated_at",
  }
);
