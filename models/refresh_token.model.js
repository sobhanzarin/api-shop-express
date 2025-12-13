const { Model, DataTypes } = require("@sequelize/core");
const sequelize = require("../config/db.config");

class refreshToken extends Model {}
refreshToken.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    token: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    modelName: "refreshToken",
    tableName: "refresh_token",
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = refreshToken;
