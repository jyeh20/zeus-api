import { Socket } from "net";
import { InnateDomainIPMap } from "./consts";
import ZeusSocket from "../ZeusSocket/ZeusSocket";

/**
 * A Zeus project that lights up framed posters.
 */
export default class InnateDomain extends ZeusSocket {
  index: number;

  /**
   * @constructor Creats a new Innate Domain socket object.
   *
   * @param ip The IP address of the connecting device.
   * @param socket The socket created by the server.
   */
  constructor(ip: string, socket: Socket) {
    super(ip, "InnateDomain", socket);
    this.index = this.getIPFromDomainMap(ip);
  }

  /**
   * Retrieves an index number from the IP Domain map.
   *
   * @param ipaddress The IP Address to retrieve the index from.
   * @returns The index of the given IP Address.
   * @throws Error if the IP Address cannot be found in the Domain map.
   */
  getIPFromDomainMap(ipaddress: string): number {
    if (ipaddress in InnateDomainIPMap) {
      return InnateDomainIPMap[ipaddress];
    }
    throw new Error(
      `IP Address: ${ipaddress} was not found in ${this.type}'s IP Map.`
    );
  }

  /**
   * Compares two InnateDomains based on their indexes/order.
   *
   * @param s1 The first Innate Domain object to compare.
   * @param s2 The second Innate Domain object to compare.
   * @returns A comparison result based on the domain indexes.
   */
  static sortByIndex(s1: InnateDomain, s2: InnateDomain): number {
    const index1 = s1.index;
    const index2 = s2.index;
    if (index1 < index2) {
      return 1;
    }
    if (index1 > index2) {
      return -1;
    }
    return 0;
  }
}
