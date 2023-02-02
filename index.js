// ------ Dependences ------

require("dotenv").config();

const cors = require("cors");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const db = require("./server/config/db.config");
const { InitSocket } = require("./server/config/socket.config");
const { db_assoc } = require("./server/utils/sequelize_assocs");

const UserRouter = require("./server/routes/users.route");
const MessageRouter = require("./server/routes/messages.route");
const ArrivalMessageRouter = require("./server/routes/arrival_messages.route");
const ConversationRouter = require("./server/routes/conversations.route");
const NotifRouter = require("./server/routes/notifications.route");

const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// ------ Middlewares ------

app.use(cors());
app.use(express.json());

// ------ Routes ------

app.use("/api/users", UserRouter);
app.use("/api/messages", MessageRouter);
app.use("/api/arrival_messages", ArrivalMessageRouter);
app.use("/api/conversations", ConversationRouter);
app.use("/api/notifications", NotifRouter);

// ------ Listen ------

async function assertDatabaseConnectionOk() {
  try {
    await db.authenticate();
    db_assoc();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();
  InitSocket(io);

  server.listen(port, () => {
    console.log(`Server listening on: http://localhost:${port}`);
  });
}

init();
