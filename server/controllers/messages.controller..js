const { Op } = require("sequelize");

const Users = require("../models/Users");
const Messages = require("../models/Messages");
const Conversations = require("../models/Conversations");

const MessagesCTRL = {
  add: async (req, res) => {
    try {
      const { sender_id, receiver_id, msg } = req.body;

      const verifyReceiver = await Users.findOne({
        where: { id: receiver_id },
      });

      if (!verifyReceiver) {
        return res
          .status(404)
          .json({ msg: `Error 404: Cet utilisateur n'existe pas. ` });
      }

      let verifyConversation = await Conversations.findOne({
        where: {
          [Op.or]: [
            { fk_users_id_1: sender_id, fk_users_id_2: receiver_id },
            { fk_users_id_1: receiver_id, fk_users_id_2: sender_id },
          ],
        },
      });
      if (!verifyConversation) {
        verifyConversation = await Conversations.create({
          fk_users_id_1: sender_id,
          fk_users_id_2: receiver_id,
        });
      }

      await Messages.create({
        fk_users_id: sender_id,
        fk_conversations_id: verifyConversation.id,
        msg: msg,
      }).then((message) => {
        return res.json({
          msg: "Success: La requete à bien été executé !",
          message,
        });
      });
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
  delete: async (req, res) => {
    try {
      const { user_id, msg_id } = req.body;

      const verifyMessage = await Messages.findOne({ where: { id: msg_id } });
      if (!verifyMessage) {
        return res.status(404).json({ msg: `Error 404: not found ` });
      }

      await Messages.destroy({
        where: {
          id: msg_id,
          fk_users_id: user_id,
        },
      }).then(async () => {
        const getAllMessages = await Messages.findAll({
          where: { fk_conversations_id: verifyMessage.fk_conversations_id },
        });

        if (!getAllMessages.length) {
          await Conversations.destroy({
            where: { id: verifyMessage.fk_conversations_id },
          });
        }

        return res.json({
          msg: "Success: La requete à bien été executé !",
        });
      });
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
};

module.exports = MessagesCTRL;
