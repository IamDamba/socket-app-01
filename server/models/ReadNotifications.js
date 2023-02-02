const Sequelise = require("sequelize");
const db = require("../config/db.config");

const ReadNotifications = db.define("read_notifications", {
  id: {
    type: Sequelise.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fk_users_id: {
    type: Sequelise.INTEGER,
    allowNull: true,
  },
  fk_notifications_id: {
    type: Sequelise.INTEGER,
    allowNull: true,
  },
});

module.exports = ReadNotifications;
