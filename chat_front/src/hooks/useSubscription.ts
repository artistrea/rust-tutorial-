import { useEffect, useState } from "react";
import { subscribe } from "../api/subscribe";
import { Message } from "../App";

type OnMessageReceived = (message: Message) => void;

export default function useSubscription(onMessageReceived: OnMessageReceived) {
  const [connected, setConnected] = useState(false);
  const [resubscription, setResubscription] = useState(0);
  const retryIn = resubscription * 1000;

  const forceResubscribe = () => setResubscription((c) => c + 1);

  useEffect(() => {
    const unsubscribe = subscribe({
      onErrorConnecting() {
        setConnected(false);
        setTimeout(forceResubscribe, retryIn);
      },
      onOpenStream() {
        setResubscription(1);
        setConnected(true);
      },
      onReceiveMessage(ev) {
        if (!ev || !("data" in ev) || typeof ev.data != "string") return;

        const data = JSON.parse(ev.data);
        if (!("message" in data) || !("room" in data) || !("username" in data))
          return;
        onMessageReceived({
          message: data.message,
          room: data.room,
          username: data.username,
        });
      },
    });

    return unsubscribe;
  }, [onMessageReceived, resubscription]);

  return { connected, retryIn };
}
