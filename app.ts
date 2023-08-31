import { Server, createServer, Socket } from "net";
import { ConnectionObject } from "./consts/consts";
import InnateDomain from "./InnateDomain/InnateDomain";

class App {
  server: Server;
  InnateDomains: Array<InnateDomain>;

  constructor() {
    this.server = this.createServer();
    this.InnateDomains = [];
  }

  createServer(): Server {
    return createServer((socket: Socket) => {
      this.handleSocketConnect(socket);
    });
  }

  handleSocketConnect(socket: Socket) {
    console.log(
      `Client connected: ${socket.remoteAddress}:${socket.localPort}`
    );
    socket.on("data", (data) => {
      this.handleData(data);
    });

    socket.on("close", () => {
      this.handleSocketClose();
    });

    socket.write(
      `Knock Knock! This is Zeus on port ${socket.localAddress}:${socket.localPort}! Who am I speaking to?\r\n`
    );

    setTimeout(() => {
      socket.write("WAHOOO IM LATE");
    }, 7000);
  }

  handleData(data: Buffer) {
    const dataAsJson: ConnectionObject = JSON.parse(data.toString());
    console.log(`Data received from client: ${dataAsJson}`);

    switch (dataAsJson.ZeusConnector) {
      case "initSocket":
        this.initializeSocket(dataAsJson);
        break;
    }
  }

  initializeSocket(data: ConnectionObject) {
    switch (data.type) {
      case "InnateDomain":
        this.InnateDomains.push(new InnateDomain(data.clientIP));
        InnateDomain.sortInnateDomainsByIndex(this.InnateDomains);
    }
  }

  handleSocketClose() {
    console.log("Client Disconnected");
  }

  get getServer() {
    return this.server;
  }
}

export default App;
