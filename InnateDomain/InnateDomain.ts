import { Socket } from "net";
import { DomainIPMap } from "../consts/consts";
import ZeusSocket from "../ZeusSocket/ZeusSocket";

export default class InnateDomain extends ZeusSocket {
  index: number;

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
    const mapToUse = DomainIPMap[this.type];
    if (ipaddress in mapToUse) {
      return mapToUse[ipaddress];
    }
    throw new Error(
      `IP Address: ${ipaddress} was not found in ${this.type}'s IP Map.`
    );
  }

  /**
   * Returns a comparison using the ZeusSocket's index property
   * as the comparison value.
   *
   * @param zs1 The first ZeusSocket to compare.
   * @param zs2 The second ZeusSocket to compare.
   * @returns An result of ZeusSocket.sort()
   */
  static sortByIndex(zs1: ZeusSocket, zs2: ZeusSocket): number {
    return super.sort(zs1, zs2, "index");
  }
}
