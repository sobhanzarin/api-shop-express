const dotenv = require("dotenv");
dotenv.config();
const { Sequelize } = require("@sequelize/core");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DRIVE,
    host: process.env.DB_HOST,
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connect to db successfully");
  } catch (error) {
    console.log("connect to db field : ", error);
  }
};

module.exports = {
  sequelize,
  connectDB,
};
