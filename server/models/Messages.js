const Sequelise = require("sequelize");
const db = require("../config/db.config");
const Users = require("./Users");
const Conversations = require("./Conversations");

const Messages = db.define(
  "messages",
  {
    id: {
      type: Sequelise.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_users_id: {
      type: Sequelise.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
    fk_conversations_id: {
      type: Sequelise.INTEGER,
    },
    msg: {
      type: Sequelise.TEXT,
    },
  },
  {
    createdAt: "created_at",
  }
);

module.exports = Messages;
