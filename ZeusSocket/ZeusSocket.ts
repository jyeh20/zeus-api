import { Socket } from "net";

const IPREGEX =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

type ZeusSocketPropertyObj = {
  [key: string]: number | string | Socket;
};

export default class ZeusSocket {
  ip: string;
  type: string;
  socket: Socket;

  /**
   * Constructor for a ZeusSocket object.
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
   * Returns an object containing the properties of a ZeusSocket.
   */
  get properties(): ZeusSocketPropertyObj {
    return {
      ip: this.ip,
      type: this.type,
      socket: this.socket,
    };
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

  /**
   * Retrieves and returns a property of the ZeusSocket.
   *
   * @param property The property to get.
   * @returns The value stored with the given property.
   * @throws TypeError if the given property is invalid.
   */
  fetchProperty(property: string): string | number | Socket {
    const propertyObj = this.properties;
    if (property in propertyObj) {
      return propertyObj[property];
    }
    throw TypeError(
      `Property ${property} does not exist in a ZeusSocket Object`
    );
  }

  /**
   * Compares two ZeusSocket objects. Used by ZeusSocketCollections to
   * sort.
   *
   * @param zs1 The first ZeusSocket to compare.
   * @param zs2 The second ZeusSocket to compare.
   * @param property The property to use to compare.
   * @returns An integer representing a comparison.
   */
  static sort(zs1: ZeusSocket, zs2: ZeusSocket, property: string): number {
    const zs1Prop = zs1.fetchProperty(property);
    const zs2Prop = zs2.fetchProperty(property);
    if (zs1Prop < zs2Prop) {
      return -1;
    }
    if (zs1Prop > zs2Prop) {
      return 1;
    }
    return 0;
  }
}
