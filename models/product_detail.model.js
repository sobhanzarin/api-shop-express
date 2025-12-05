const { DataTypes, Model } = require("@sequelize/core");
const sequelize = require("../config/db.config");

class ProductDetail extends Model {}
ProductDetail.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    key: { type: DataTypes.STRING },
    value: { type: DataTypes.STRING },
    productId: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "ProductDetail",
    tableName: "product_detail",
  }
);

module.exports = ProductDetail;
