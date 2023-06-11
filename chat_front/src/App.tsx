import { useCallback, useState } from "react";
import "./App.css";
import MessageForm from "./components/MessageForm";
import MessageCard from "./components/MessageCard";
import Sidebar from "./components/Sidebar";
import useSubscription from "./hooks/useSubscription";
import { api } from "./api";

export type Message = {
  room: string;
  username: string;
  message: string;
};

function App() {
  const [messages, setMessages] = useState([
    {
      room: "rocket",
      username: "rocket",
      message: "Try it out!",
    },
    {
      room: "another room",
      username: "rocket",
      message: "Try it out!",
    },
  ]);

  const onMessageReceived = useCallback(
    (m: Message) => {
      setMessages((ms) => [...ms, m]);
    },
    [setMessages]
  );

  const { connected, retryIn } = useSubscription(onMessageReceived);

  const [rooms, setRooms] = useState(["rocket", "another room"]);
  const [curRoom, setCurRoom] = useState("rocket");

  const addRoom = (room: string) => {
    if (!rooms.includes(room)) setRooms([...rooms, room]);
    else setCurRoom(room);
  };

  function sendMessage({
    username,
    message,
  }: {
    username: string;
    message: string;
  }) {
    api
      .post("/message", { room: curRoom, username, message }, undefined)
      .then(console.log)
      .catch(console.error);
    console.log("posting");
    // setMessages((ms) => [...ms, { room: curRoom, message, username }]);
  }

  const shownMessages = messages.filter((m) => m.room === curRoom);

  return (
    <>
      <Sidebar
        connected={connected}
        retryIn={retryIn}
        room={curRoom}
        rooms={rooms}
        addRoom={addRoom}
        onRoomChange={(r) => setCurRoom(r)}
      />
      <section
        style={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ul
          className="max-h-[70vh] flex flex-col gap-4 mt-4 overflow-y-scroll sm:max-h-[80vh]
            w-11/12
          "
          style={{
            width: "90%",
            flex: 1,
          }}
        >
          {shownMessages.map((m, i) => (
            <li
              className="w-4/5 mx-auto list-none"
              key={m.message + m.username + m.room + i}
            >
              <MessageCard username={m.username} message={m.message} />
            </li>
          ))}
          {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        </ul>
        <div style={{ marginTop: "3rem" }}>
          <MessageForm onSend={sendMessage} />
        </div>
      </section>
    </>
  );
}

export default App;
