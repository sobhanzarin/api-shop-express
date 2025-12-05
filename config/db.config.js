const dotenv = require("dotenv");
const { Sequelize } = require("@sequelize/core");
dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  database: process.env.BD_NAME,
  user: process.env.DB_USER,
  password: "",
  port: 3306,
  host: process.env.DB_HOST,
  logging: false,
});

module.exports = sequelize;
