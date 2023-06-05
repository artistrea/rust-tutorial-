import { useEffect, useState } from "react";
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

  const { connected, retryIn } = useSubscription((m) =>
    setMessages((ms) => [...ms, m])
  );

  const [rooms, setRooms] = useState(["rocket", "another room"]);
  const [curRoom, setCurRoom] = useState("rocket");

  // const addRoom = (room: string) => {
  //   if (!rooms.includes(room)) setRooms([...rooms, room]);
  //   else setCurRoom(room);
  // };

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
            gap: "1rem",
            overflow: "scroll",
            maxHeight: "80vh",
            width: "90%",
            flex: 1,
          }}
        >
          {shownMessages.map((m) => (
            <div style={{ width: "80%", marginInline: "auto" }}>
              <MessageCard username={m.username} message={m.message} />
            </div>
          ))}
          {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        </div>
        <div style={{ marginTop: "3rem" }}>
          <MessageForm onSend={sendMessage} />
        </div>
      </section>
    </>
  );
}

export default App;
