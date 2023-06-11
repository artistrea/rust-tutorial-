import { Menu, MessagesSquare, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside
        className={`transition-transform duration-300 ${
          open ? "" : "-translate-x-full"
        }
        py-2
        z-50 lg:translate-x-0 absolute h-full lg:h-auto lg:relative flex flex-col bg-zinc-900 border-r border-solid border-black border-opacity-5 min-w-max`}
      >
        <button
          onClick={() => setOpen((op) => !op)}
          className="text-yellow-400 block lg:hidden absolute left-full"
        >
          <Menu
            className={`transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          {!open && (
            <>
              <MessagesSquare className="h-4 mt-auto" />
            </>
          )}
          <X
            className={`transition-opacity duration-300 ${
              open ? "" : "opacity-0"
            } absolute top-0`}
          />
        </button>
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
                key={r}
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
              className="bg-neutral-700 p-1 text-white"
              type="text"
              id="room"
              value={roomToAdd}
              onChange={(e) => setRoomToAdd(e.target.value)}
            />
            <button className="px-3 py-1 bg-black bg-opacity-[0.4] text-center">
              +
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
