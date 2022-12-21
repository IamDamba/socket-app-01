const { Op } = require("sequelize");

const Conversations = require("../models/Conversations");
const Users = require("../models/Users");
const Messages = require("../models/Messages");
const MessageNotifications = require("../models/MessageNotifications");
const ReadNotifications = require("../models/ReadNotifications");

const NotificationsCTRL = {
  // All Notifications
  all: async (req, res) => {
    try {
      const { id } = req.params;
      const message_notifications_list = await MessageNotifications.findAll({
        where: { fk_users_id_receiver: id },
        order: [["id", "DESC"]],
      });

      return res.json(message_notifications_list);
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },

  // Messages Notifications
  add_messages: async (req, res) => {
    try {
      const { sender_id, receiver_id, message_id } = req.body;
      await MessageNotifications.create({
        fk_users_id_sender: sender_id,
        fk_users_id_receiver: receiver_id,
        notifiable_id: message_id,
        msg: "New Message",
      })
        .then((data) => {
          return res
            .status(200)
            .json({ msg: `La requête à bien été executée.` });
        })
        .catch((error) => {
          return res.status(400).json({ msg: `Error 400: ${error} ` });
        });
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
  delete_messages: async (req, res) => {
    try {
      const { notif_id } = req.body;
      await MessageNotifications.destroy({
        where: { id: notif_id },
      })
        .then((data) => {
          return res
            .status(200)
            .json({ msg: `La requête à bien été executée.` });
        })
        .catch((error) => {
          return res.status(400).json({ msg: `Error 400: ${error} ` });
        });
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
};

module.exports = NotificationsCTRL;
