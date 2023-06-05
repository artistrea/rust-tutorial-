import { FormEventHandler, useState } from "react";

type OnSendParams = {
  username: string;
  message: string;
};

type Props = {
  onSend: (p: OnSendParams) => void;
};

export default function MessageForm({ onSend }: Props) {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const usr = username || "guest";
    if (!message || !usr) {
      return;
    }
    onSend({
      username: usr,
      message,
    });
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex" }}>
      <div
        style={{ padding: "0.1rem", display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="username">username:</label>
        <input
          id="username"
          type="text"
          value={username}
          placeholder="guest"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div
        style={{ padding: "0.1rem", display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="message">message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        style={{
          height: "80%",
          fontSize: "0.8rem",
          padding: "0.3em 1em",
          marginTop: "auto",
          borderRadius: 0,
        }}
      >
        Send
      </button>
    </form>
  );
}
