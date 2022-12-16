const Sequelise = require("sequelize");
const db = require("../config/db.config");

const Users = db.define("users", {
  id: {
    type: Sequelise.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelise.STRING,
  },
  username: {
    type: Sequelise.STRING,
  },
  pwd: {
    type: Sequelise.STRING,
  },
});

module.exports = Users;
