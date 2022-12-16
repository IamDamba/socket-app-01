const { Router } = require("express");
const UserCTRL = require("../controllers/users.controller");

const router = Router();

router.route("/").get(UserCTRL.all).post(UserCTRL.one);

module.exports = router;
