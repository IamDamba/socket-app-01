const db = require("../config/db.config");
const Users = require("../models/Users");
const Messages = require("../models/Messages");
const Conversations = require("../models/Conversations");

const db_assoc = () => {
  Users.hasMany(Conversations, {
    foreignKey: "fk_users_id_1",
  });
  Users.hasMany(Conversations, {
    foreignKey: "fk_users_id_2",
  });

  Conversations.belongsTo(Users, {
    foreignKey: "fk_users_id_1",
    as: "user_1"
  });
  Conversations.belongsTo(Users, {
    foreignKey: "fk_users_id_2",
    as: "user_2"
  });
  Conversations.hasMany(Messages, {
    foreignKey: "fk_conversations_id",
    as: "messages",
  });

  //Messages
  Messages.belongsTo(Conversations, {
    foreignKey: "fk_conversations_id",
  });
};

module.exports = { db_assoc };
