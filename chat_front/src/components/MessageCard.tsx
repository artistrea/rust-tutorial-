import { hashColor } from "../utils";

export default function MessageCard(message: {
  username: string;
  message: string;
}) {
  const color = hashColor(message.username);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0.5rem 1rem",
        position: "relative",
        background: "rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          color: color,
          position: "relative",
          left: "-0.5rem",
          top: "-0.25rem",
        }}
      >
        {message.username}
      </div>
      <div>{message.message}</div>
    </div>
  );
}
