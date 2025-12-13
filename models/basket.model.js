const { DataTypes, Model } = require("@sequelize/core");
const sequelize = require("../config/db.config");
class Basket extends Model {}
Basket.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER },
    productId: { type: DataTypes.INTEGER, allowNull: true },
    sizeId: { type: DataTypes.INTEGER, allowNull: true },
    colorId: { type: DataTypes.INTEGER, allowNull: true },
    discountId: { type: DataTypes.INTEGER, allowNull: true },
    count: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Basket",
    tableName: "basket",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Basket;
