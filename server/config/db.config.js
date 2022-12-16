const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      useUTC: false,
    },
    timezone: "+01:00",
    define: {
      updatedAt: false,
      createdAt: false,
    },
  }
);

module.exports = db;
