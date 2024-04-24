import { LogLevel,HubConnection, HubConnectionBuilder,HttpTransportType } from '@microsoft/signalr';

let connection: HubConnection | null = null;

export const setupWebSocketConnection = () => {
  if (!connection) {
    connection = new HubConnectionBuilder()
      .withUrl("http://localhost:8000/chat", { skipNegotiation: true, transport: HttpTransportType.WebSockets })
      .configureLogging(LogLevel.Information)
      .build();

    connection.start().catch(error => console.error("WebSocket connection failed:", error));
  }

  return connection;
};

export const closeWebSocketConnection = () => {
  if (connection) {
    connection.stop().catch(error => console.error("WebSocket connection stopping failed:", error));
    connection = null;
  }
};
