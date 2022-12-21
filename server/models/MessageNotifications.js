const Sequelise = require("sequelize");
const db = require("../config/db.config");

const MessageNotifications = db.define("message_notifications", {
  id: {
    type: Sequelise.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fk_users_id_sender: {
    type: Sequelise.INTEGER,
    allowNull: true,
  },
  fk_users_id_receiver: {
    type: Sequelise.INTEGER,
    allowNull: true,
  },
  notifiable_id: {
    type: Sequelise.INTEGER,
    allowNull: true,
  },
  msg: {
    type: Sequelise.TEXT,
  },
  msg_type: {
    type: Sequelise.TEXT,
    defaultValue: "Link",
  },
});

module.exports = MessageNotifications;
