const { Router } = require("express");
const ArrivalMessages = require("../controllers/arrival_messages.controller");

const router = Router();

router.route("/").post(ArrivalMessages.add);
router.route("/:user_id").get(ArrivalMessages.all);
router.route("/:user_id/:conv_id").delete(ArrivalMessages.delete);

module.exports = router;
