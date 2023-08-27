import { createServer, Server, Socket } from "net";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const PORT: number = Number(process.env.PORT);

const server: Server = createServer((socket: Socket) => {
  console.log(`Client connected: ${socket.remoteAddress}`);
  socket.on("end", () => {
    console.log("Client Disconnected");
  });
  socket.on("data", (data) => {
    console.log(`Data received from client: ${data}`);
  });
  socket.on("close", () => {
    console.log("Client Disconnected");
  });

  socket.write(
    `Knock Knock! This is Zeus on port ${socket.localPort}! Who am I speaking to?\r\n`
  );

  setTimeout(() => {
    socket.write("WAHOOO IM LATE");
  }, 7000);
});

server.on("drop", () => {
  console.log("Client disconnected");
});

server.on("error", (err) => {
  throw err;
});

server.listen(PORT, () => {
  console.log(`Zeus is listening on port ${PORT}`);
});
