const { Model, DataTypes } = require("@sequelize/core");
const sequelize = require("../config/db.config");

class User extends Model {}
User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mobile: { type: DataTypes.STRING(11), allowNull: false, unique: true },
    otpId: { type: DataTypes.INTEGER },
    ban_until: { type: DataTypes.DATE, allowNull: true },
    wrong_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "user",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = User;
