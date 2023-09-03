import { SocketCollectionTypes } from "./consts";

/**
 * A custom array for storing objects based on the ZeusSocket base class.
 */
export default class ZeusSocketCollection<SocketType> extends Array {
  type: string;

  /**
   * @constructor Creates a new ZeusSocketCollection
   *
   * @param collectionType The type of Socket to store.
   * @param sockets Socket objects to store on initialization
   */
  constructor(collectionType: string, ...sockets: SocketType[]) {
    super();
    if (ZeusSocketCollection.validCollectionType(collectionType)) {
      this.type = collectionType;
    } else {
      throw new TypeError(`${collectionType} is not a valid collection type!`);
    }
    [...sockets].forEach((socket) => this.push(socket));
  }

  /**
   * Validates if a socket type is allowed in a ZeusSocketCollection
   *
   * @param socketType The collection type to check
   * @returns Whether the socketType if valid.
   */
  static validCollectionType(socketType: string): boolean {
    return socketType in SocketCollectionTypes;
  }

  /**
   * Clears the ZeusSocketCollection
   */
  clear() {
    this.length = 0;
  }
}
