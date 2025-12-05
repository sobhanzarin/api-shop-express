const { DataTypes, Model } = require("@sequelize/core");
const sequelize = require("../config/db.config");

class ProductSize extends Model {}
ProductSize.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    size: { type: DataTypes.STRING, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    discount: { type: DataTypes.INTEGER, allowNull: true },
    active_discount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "ProductSize",
    tableName: "product_size",
  }
);

module.exports = ProductSize;
