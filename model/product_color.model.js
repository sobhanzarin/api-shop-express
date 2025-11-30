const { DataTypes } = require("@sequelize/core");
const { sequelize } = require("../config/db.config");

const ProductColor = sequelize.define(
  "product_color",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    color_name: { type: DataTypes.STRING, allowNull: false },
    color_code: { type: DataTypes.STRING, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    discount: { type: DataTypes.INTEGER, allowNull: true },
    active_discount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    modelName: "product_color",
  }
);

module.exports = ProductColor;
