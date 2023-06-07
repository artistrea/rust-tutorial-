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
        setPassedTime(0);
        const x = 93;
        const intr = setInterval(() => {
          setPassedTime((p) => p + x);
        }, x);

        setTimeout(() => {
          forceResubscribe();
          clearInterval(intr);
        }, retryIn);
      },
      onOpenStream() {
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
  }, [resubscription, onMessageReceived, retryIn]);

  const [passedTime, setPassedTime] = useState(0);
  // useEffect(() => {
  //   setPassedTime(0);

  //   return () => {
  //     clearInterval(intr);
  //   };
  // }, [resubscription, retryIn]);

  return { connected, retryIn: retryIn - passedTime };
}
