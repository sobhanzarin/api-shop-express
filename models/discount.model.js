const { DataTypes, Model } = require("@sequelize/core");
const sequelize = require("../config/db.config");

class Discount extends Model {}
Discount.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, allowNull: true },
    amount: { type: DataTypes.INTEGER },
    percent: { type: DataTypes.INTEGER },
    limit: { type: DataTypes.INTEGER, allowNull: true },
    usage: { type: DataTypes.INTEGER, allowNull: true },
    type: { type: DataTypes.ENUM("basket", "product") },
    expires_in: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    modelName: "Discount",
    tableName: "discount",
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = Discount;
