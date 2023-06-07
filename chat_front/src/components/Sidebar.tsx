import { useState } from "react";

export default function Sidebar({
  rooms,
  room,
  onRoomChange,
  connected,
  addRoom,
  retryIn,
}: {
  rooms: string[];
  room: string;
  onRoomChange: (room: string) => void;
  connected: boolean;
  addRoom: (room: string) => void;
  retryIn: number;
}) {
  const [roomToAdd, setRoomToAdd] = useState("");

  return (
    <aside className="flex flex-col bg-black bg-opacity-[0.1] border-r border-solid border-black border-opacity-5 min-w-max">
      <p
        className={`${
          connected || retryIn === 0 ? "text-green-500" : "text-red-500"
        }  text-sm mx-auto`}
      >
        {connected || retryIn === 0
          ? "Connected"
          : `Trying again in ${(retryIn / 1000).toFixed(3)}s`}
      </p>
      <nav style={{ display: "contents" }}>
        <ul style={{ height: "100%", margin: 0, padding: 0 }}>
          {rooms.map((r) => (
            <li
              onClick={() => onRoomChange(r)}
              className="my-2 cursor-pointer w-full"
            >
              <button
                className={`${
                  r === room ? "bg-[rgba(0,0,0,0.5)]" : ""
                } p-2 w-full`}
              >
                {r}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <form
        className="flex flex-col items-center"
        onSubmit={(e) => {
          e.preventDefault();
          addRoom(roomToAdd);
        }}
      >
        <label htmlFor="roomt">Add room:</label>
        <div className="m-1">
          <input
            type="text"
            id="room"
            className="p-1"
            value={roomToAdd}
            onChange={(e) => setRoomToAdd(e.target.value)}
          />
          <button className="px-3 py-1 bg-black bg-opacity-[0.4] text-center">
            +
          </button>
        </div>
      </form>
    </aside>
  );
}
