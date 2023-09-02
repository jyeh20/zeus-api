import { createServer, Server, Socket } from "net";
import dotenv from "dotenv";
import InnateDomain from "./InnateDomain/InnateDomain";
import { ConnectionObject } from "./consts/consts";
import App from "./app";

dotenv.config({ path: ".env" });

const PORT: number = Number(process.env.PORT);

const app = new App();

const server = app.getServer;

server.on("drop", () => {
  console.log("Client disconnected");
});

server.on("error", (err) => {
  throw err;
});

server.listen(PORT, () => {
  console.log(`Zeus is listening on port ${PORT}`);
});
