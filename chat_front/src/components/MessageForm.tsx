import { Send } from "lucide-react";
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-center"
    >
      <div
        style={{ padding: "0.1rem", display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="username">username:</label>
        <input
          className="bg-neutral-700 p-2 text-white"
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
          className="bg-neutral-700 p-2 text-white"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        className="h-full text-blue-400 text-xs relative flex justify-center items-center gap-1"
        style={{
          padding: "0.9em 1em",
          marginTop: "auto",
          borderRadius: 0,
        }}
      >
        <Send className="" />
      </button>
    </form>
  );
}
