const { Router } = require("express");
const ConversationCTRL = require("../controllers/conversations.controller.js");

const router = Router();

router.route("/").delete(ConversationCTRL.delete).post(ConversationCTRL.add);
router.get("/all/:id", ConversationCTRL.all);
router.get("/one/:id", ConversationCTRL.one);

module.exports = router;
