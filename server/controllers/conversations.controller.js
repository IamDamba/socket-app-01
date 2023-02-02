const { Op } = require("sequelize");

const Conversations = require("../models/Conversations");
const Users = require("../models/Users");
const Messages = require("../models/Messages");

const ConversationCTRL = {
  all: async (req, res) => {
    try {
      const { id } = req.params;
      await Conversations.findAll({
        where: {
          [Op.or]: [{ fk_users_id_1: id }, { fk_users_id_2: id }],
        },
        include: [
          { model: Users, as: "user_1" },
          { model: Users, as: "user_2" },
        ],
      }).then((conversations) => {
        let conv_arr = [];

        conversations.map((conv) => {
          let user_2 = conv.user_1.id == id ? conv.user_2 : conv.user_1;

          conv_arr.push({
            id: conv.id,
            fk_users_id_1: conv.fk_users_id_1,
            fk_users_id_2: conv.fk_users_id_2,
            conversation_name: user_2.username,
          });
        });

        return res.json(conv_arr);
      });
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
  one: async (req, res) => {
    try {
      const { id } = req.params;
      await Conversations.findOne({
        where: { id: id },
        include: [{ model: Messages, as: "messages" }],
      }).then((conversation) => {
        return res.json(conversation);
      });
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
  add: async (req, res) => {
    try {
      const { fk_user_id, user_id } = req.body;

      await Conversations.create({
        fk_users_id_1: user_id,
        fk_users_id_2: fk_user_id,
      }).then(() => {
        return res.status(200).json({ msg: `Success: Conv à bien ete créer ` });
      });
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
  delete: async (req, res) => {
    try {
      const { user_id, conv_id } = req.body;

      const verifyConversation = await Conversations.findOne({
        where: { id: conv_id },
      });
      if (!verifyConversation) {
        return res.status(404).json({ msg: `Error 404: not found ` });
      }

      let getAllMessages = await Messages.findAll({
        where: { fk_conversations_id: conv_id },
      });

      getAllMessages.map(async (message) => {
        await Messages.destroy({ where: { id: message.id } });
      });

      if (getAllMessages.length) {
        return res.status(400).json({ msg: `Error 400: error occured. ` });
      }

      await Conversations.destroy({ where: { id: conv_id } }).then(() => {
        return res
          .status(200)
          .json({ msg: `Success: Conv à bien ete delete ` });
      });
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
};

module.exports = ConversationCTRL;
