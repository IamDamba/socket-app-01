const { Op } = require("sequelize");

const Users = require("../models/Users");

const UserCTRL = {
  all: async (req, res) => {
    try {
      await Users.findAll().then((users) => {
        return res.json(users);
      });
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
  by_search: async (req, res) => {
    try {
      const { user_id } = req.params;
      const { username } = req.query;

      await Users.findAll({
        where: { username: { [Op.iRegexp]: username }, id: { [Op.ne]: user_id } },
      }).then((users) => {
        return res.json(users);
      });
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
  one: async (req, res) => {
    try {
      const { email, pwd } = req.body;
      await Users.findOne({ where: { email: email, pwd: pwd } }).then(
        (user) => {
          if (!user)
            return res.status(404).json({ msg: `Error 404: not found ` });

          return res.json(user);
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: `Error 500: ${err.message} ` });
    }
  },
};

module.exports = UserCTRL;
