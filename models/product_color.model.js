const { DataTypes, Model } = require("@sequelize/core");
const sequelize = require("../config/db.config");

class ProductColor extends Model {}
ProductColor.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    color_name: { type: DataTypes.STRING, allowNull: false },
    color_code: { type: DataTypes.STRING, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    discount: { type: DataTypes.INTEGER, allowNull: true },
    active_discount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "ProductColor",
    tableName: "product_color",
  }
);

module.exports = ProductColor;
