// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

// ||||||||||||||||||||||||||||| Home_Page Component ||||||||||||||||||||||||||||||||||||

const Home_Page = () => {
  // Hooks
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [messages_list, setMessages_List] = useState([]);

  const socket = useRef(null);
  const bottomRef = useRef(null);

  // Reducer
  const { user_id } = useSelector((state) => state.auth);

  //Functions
  const getAllConversations = async () => {
    await axios.get(`/api/conversations/all/${user_id}`).then((res) => {
      setConversations(res.data);
    });
  };
  const getOneConversation = async (conv_id) => {
    await axios.get(`/api/conversations/one/${conv_id}`).then((res) => {
      setCurrentConv({
        id: res.data.id,
        fk_users_id_1: res.data.fk_users_id_1,
        fk_users_id_2: res.data.fk_users_id_2,
      });
      setMessages_List(res.data.messages);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleSubmit = async () => {
    if (!message.length) {
      alert("erreur: msg vide");
      return;
    } else if (!currentConv) {
      alert("erreur: current conv vide");
      return;
    } else {
      let receiver_user =
        currentConv.fk_users_id_1 == user_id
          ? currentConv.fk_users_id_2
          : currentConv.fk_users_id_1;

      await axios
        .post("/api/messages", {
          sender_id: user_id,
          receiver_id: receiver_user,
          msg: message,
        })
        .then(() => {
          setMessages_List((e) => [
            ...e,
            {
              fk_users_id: user_id,
              fk_conversations_id: currentConv.id,
              msg: message,
              created_at: new Date(),
            },
          ]);
          socket.current.emit("send_message", {
            senderID: user_id,
            receiverID: receiver_user,
            text: message,
            created_at: new Date(),
            convID: currentConv.id,
          });
          setMessage("");
          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        })
        .catch((err) => {
          if (!err.response.data.msg) console.log(err);
          else console.log(err.response.data.msg);
        });
    }
  };

  // UseEffect
  useEffect(() => {
    socket.current = io("ws://localhost:3001", { transports: ["websocket"] });
    socket.current.on("get_message", (data) => {
      setMessages_List((e) => [
        ...e,
        {
          fk_users_id: data.senderID,
          fk_conversations_id: data.convID,
          msg: data.text,
          created_at: data.created_at,
        },
      ]);
    });
  }, []);

  useEffect(() => {
    if (user_id) {
      socket.current.emit("add_user", user_id, (res) => {
        console.log(res);
      });
    }
  }, [user_id]);

  useEffect(() => {
    getAllConversations();
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Return
  return (
    <main className="home flex">
      <section className="first w-[300px] h-[100vh] space-y-8 border-r-2 border-black">
        <div className="search w-full ">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search for friends"
            className="w-full py-2 px-6"
          />
        </div>
        <ul>
          {conversations.map((conv, key) => (
            <li key={key}>
              <button
                className="bg-white py-3 px-6 w-full font-medium focus:bg-slate-300"
                onClick={() => getOneConversation(conv.id)}
              >
                {conv.conversation_name}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className="second flex-1 relative">
        <div className="msg-box flex flex-col h-[100vh] overflow-y-scroll">
          <div className="top flex-1 flex flex-col space-y-8 px-8 pt-16 pb-16">
            {messages_list.length ? (
              messages_list.map((msg, key) => (
                <div
                  key={key}
                  className={
                    msg.fk_users_id == user_id
                      ? `right flex flex-col self-end`
                      : `left`
                  }
                >
                  <div
                    className={`content inline-block px-3 py-2 rounded-full ${
                      msg.fk_users_id == user_id
                        ? "bg-gray-300"
                        : "bg-orange-400"
                    }`}
                  >
                    <p className="w-fit">{msg.msg}</p>
                  </div>
                  <div className="date">
                    <p className="text-sm font-medium">{`${new Date(
                      msg.created_at
                    ).toLocaleDateString()}-${new Date(
                      msg.created_at
                    ).toLocaleTimeString()}`}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucun message n'à été trouvé</p>
            )}
          </div>
          <div className="scroll-bottom" ref={bottomRef}></div>
          <div className="bot flex items-center sticky bottom-0 left-0">
            <div className="input w-full">
              <input
                type="text"
                name=""
                id=""
                className="w-full py-3 px-6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="btn ">
              <button
                className="py-3 px-10 bg-orange-400 font-medium"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Home_Page;
