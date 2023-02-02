const { Router } = require("express");
const UserCTRL = require("../controllers/users.controller");

const router = Router();

router.route("/").get(UserCTRL.all).post(UserCTRL.one);
router.route("/:user_id").get(UserCTRL.by_search);

module.exports = router;
