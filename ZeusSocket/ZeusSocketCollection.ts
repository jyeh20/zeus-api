import ZeusSocket from "./ZeusSocket";

export default class ZeusSocketCollection extends Array {
  constructor(...sockets: ZeusSocket[]) {
    super();
    [...sockets].forEach((socket) => this.push(socket));
  }
}
