const http = require("http");
const { Server } = require("socket.io");

let users = [];

//Users
const AddUsers = (userID, socketID) => {
  !users.some((user) => user.userID === userID) &&
    users.push({ userID, socketID });
};
const RemoveUsers = (socketID) => {
  users = users.filter((user) => user.socketID !== socketID);
};
const GetUser = (userID) => {
  return users.find((user) => user.userID == userID);
};


//Init Socket
const InitSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    // Take userID and socketID from user
    socket.on("add_user", (user_id, cb) => {
      AddUsers(user_id, socket.id);
      cb(users);
    });

    // Send and Get messages
    socket.on(
      "send_message",
      ({ senderID, receiverID, text, created_at, convID }) => {
        const user = GetUser(receiverID);
        console.log(user);
        io.to(user.socketID).emit("get_message", {
          senderID,
          text,
          created_at,
          convID,
        });
      }
    );

    // When disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnect");
      RemoveUsers(socket.id);
    });
  });
};

module.exports = { InitSocket };
