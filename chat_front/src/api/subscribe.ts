import { baseURL } from ".";

type SubscribeParams = {
  onReceiveMessage: (ev: MessageEvent<unknown>) => void;
  onErrorConnecting: (ev: MessageEvent<unknown>) => void;
  onOpenStream: (ev: MessageEvent<unknown>) => void;
};

type Unsubscribe = () => void; // unsubscribes events

const route = "/events";

export function subscribe({
  onReceiveMessage,
  onErrorConnecting,
  onOpenStream,
}: SubscribeParams): Unsubscribe {
  const SSEventsSource = new EventSource(baseURL + route);

  SSEventsSource.addEventListener("error", onErrorConnecting);
  SSEventsSource.addEventListener("message", onReceiveMessage);
  SSEventsSource.addEventListener("open", onOpenStream);

  return () => {
    SSEventsSource.removeEventListener("error", onErrorConnecting);
    SSEventsSource.removeEventListener("message", onReceiveMessage);
    SSEventsSource.removeEventListener("open", onOpenStream);
    SSEventsSource.close();
  };
}
