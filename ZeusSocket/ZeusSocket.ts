import { Socket } from "net";

const IPREGEX =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

/**
 * Base class for storing sockets created by connections from
 * Zeus devices.
 */
export default class ZeusSocket {
  ip: string;
  type: string;
  socket: Socket;

  /**
   * @constructor Creates a new ZeusSocket object.
   *
   * @param ip The IP address of the device that is connecting.
   * @param socketObject The socket object created when a device connects to the server.
   */
  constructor(ip: string, deviceType: string, socketObject: Socket) {
    this.ip = this.checkIfValidIP(ip);
    this.type = deviceType;
    this.socket = socketObject;
  }

  /**
   * Checks if an IP Address is valid.
   *
   * @param ipaddress The string to test.
   * @returns The given IP Address if it passes the IP Regex
   * @throws A RangeError if the IP Address is invalid.
   */
  checkIfValidIP(ipaddress: string): string {
    if (IPREGEX.test(ipaddress)) {
      return ipaddress;
    }
    throw new RangeError(`${ipaddress} is an invalid IP Address!`);
  }
}
