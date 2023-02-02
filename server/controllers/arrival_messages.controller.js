const { Op } = require("sequelize");

const Users = require("../models/Users");
const Messages = require("../models/Messages");
const ArrivalMessages = require("../models/ArrivalMessages");
const Conversations = require("../models/Conversations");

const ArrivalMessagesCTRL = {
  all: async (req, res) => {
    try {
      const { user_id } = req.params;

      await ArrivalMessages.findAll({
        where: { [Op.not]: [{ fk_users_id: user_id }] },
      })
        .then((message) => {
          return res.json({
            msg: "Success: La requete à bien été executé !",
            all_arr_msg: message,
          });
        })
        .catch((err) => {
          return res.status(400).json({ msg: `Error 400: ${err} ` });
        });
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
  add: async (req, res) => {
    try {
      const { sender_id, conv_id, msg } = req.body;

      await ArrivalMessages.create({
        fk_users_id: sender_id,
        fk_conversations_id: conv_id,
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
      const { user_id, conv_id } = req.params;

      await ArrivalMessages.destroy({
        where: {
          fk_users_id: { [Op.not]: [user_id] },
          fk_conversations_id: conv_id,
        },
      })
        .then(async () => {
          console.log("ici");
          const all_arr_msg = await ArrivalMessages.findAll({
            where: { [Op.not]: [{ fk_users_id: user_id }] },
          });
          return res.json({
            msg: "Success: La requete à bien été executé !",
            arrival_messages: all_arr_msg,
          });
        })
        .catch((err) => {
          return res.status(400).json({ msg: `Error 400: ${err.message} ` });
        });
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
};

module.exports = ArrivalMessagesCTRL;
