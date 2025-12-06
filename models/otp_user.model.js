const { Model, DataTypes } = require("@sequelize/core");
const sequelize = require("../config/db.config");

class OtpCode extends Model {}
User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    otp: { type: DataTypes.STRING(5), allowNull: false },
    expires_otp: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    modelName: "otpCode",
    tableName: "otp_code",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = OtpCode;
