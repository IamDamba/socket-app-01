const Sequelise = require("sequelize");
const db = require("../config/db.config");
const Users = require("./Users");

const Conversations = db.define("conversations", {
  id: {
    type: Sequelise.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fk_users_id_1: {
    type: Sequelise.INTEGER,
  },
  fk_users_id_2: {
    type: Sequelise.INTEGER,
  },
});

module.exports = Conversations;
