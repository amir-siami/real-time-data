import { TickerData } from "./types";

type MessageCallback = (data: TickerData[]) => void;

class SocketManager {
  private socket: WebSocket;
  private listeners: MessageCallback[] = [];

  constructor(private url: string) {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      this.subscribe();
    };

    this.socket.onmessage = (event) => {
      const data: TickerData[] = JSON.parse(event.data);
      this.listeners.forEach((listener) => listener(data));
    };

    this.socket.onclose = (event) => {
      console.log(`WebSocket disconnected: ${event.code}`);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error", error);
    };
  }

  get readyState() {
    return this.socket.readyState;
  }

  private subscribe() {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: ["!ticker@arr"],
          id: 1,
        })
      );
    }
  }

  public addListener(callback: MessageCallback) {
    this.listeners.push(callback);
  }

  public removeListener(callback: MessageCallback) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  public disconnect() {
    this.socket.close();
  }
}

export default SocketManager;
