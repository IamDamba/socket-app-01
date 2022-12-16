const { Router } = require("express");
const MessagesCTRL = require("../controllers/messages.controller.");

const router = Router();

router.route("/").post(MessagesCTRL.add).delete(MessagesCTRL.delete);

module.exports = router;
