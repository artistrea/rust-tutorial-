import { useEffect, useState } from "react";

export default function Sidebar({
  rooms,
  room,
  onRoomChange,
  connected,
  retryIn,
}: {
  rooms: string[];
  room: string;
  onRoomChange: (room: string) => void;
  connected: boolean;
  retryIn: number;
}) {
  const [passedTime, setPassedTime] = useState(0);
  useEffect(() => {
    if (retryIn === 0) return;

    const x = 200;
    const intr = setInterval(() => {
      setPassedTime((p) => p + x);
    }, x);

    return () => {
      setPassedTime(0);
      clearInterval(intr);
    };
  }, [retryIn]);

  const timeLeft = retryIn - passedTime;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "rgba(0,0,0,0.1)",
        borderRight: "solid rgba(0,0,0,0.3) 1px",
        minHeight: "100vh",
      }}
    >
      <p
        className={`${
          connected || retryIn === 0 ? "text-green-500" : "text-red-500"
        }  text-sm mx-auto`}
      >
        {connected || retryIn === 0
          ? "Connected"
          : `Trying again in ${(timeLeft / 1000).toFixed(1)}s`}
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
    </div>
  );
}
