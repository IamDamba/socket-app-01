const { Router } = require("express");
const NotificationsCTRL = require("../controllers/notifications.controller.js");

const router = Router();

router.route("/:id").get(NotificationsCTRL.all);
router
  .route("/messages")
  .post(NotificationsCTRL.add_messages)
  .delete(NotificationsCTRL.delete_messages);

module.exports = router;
