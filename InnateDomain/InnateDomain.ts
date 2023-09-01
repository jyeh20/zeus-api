import { InnateDomainIPMap } from "../consts/consts";

class InnateDomain {
  ip: string;
  index: number;

  constructor(ip: string) {
    this.ip = this.checkIfValidIP(ip);
    this.index = this.getIPFromDomainMap(ip);
  }

  // Getters

  get getIP() {
    return this.ip;
  }

  get getIndex() {
    return this.index;
  }

  checkIfValidIP(ipaddress: string): string {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipaddress
      )
    ) {
      return ipaddress;
    }
    throw new RangeError(`${ipaddress} is an invalid IP Address!`);
  }

  getIPFromDomainMap(ipaddress: string): number {
    if (ipaddress in InnateDomainIPMap) {
      return InnateDomainIPMap[ipaddress];
    }
    throw new Error(`${ipaddress} was not found in InnateDomainIPMap`);
  }

  fetchProperty(property: string): any {
    switch (property.toLowerCase()) {
      case "ip":
        return this.ip;
      case "index":
        return this.index;
    }
    throw TypeError(`Property ${property} does not exist in an InnateDomain`);
  }

  static #sortInnateDomains(
    InnateDomainsArr: Array<InnateDomain>,
    property: any,
    order = "ascending"
  ): Array<InnateDomain> {
    const sortedInnateDomains = InnateDomainsArr.sort(
      (domain1: InnateDomain, domain2: InnateDomain) => {
        const d1Prop = domain1.fetchProperty(property);
        const d2Prop = domain2.fetchProperty(property);
        if (d1Prop < d2Prop) {
          return -1;
        }
        if (d1Prop > d2Prop) {
          return 1;
        }

        return 0;
      }
    );

    if (order === "descending") {
      return sortedInnateDomains.reverse();
    }

    return sortedInnateDomains;
  }

  static sortInnateDomainsByIndex(
    InnateDomainsArr: Array<InnateDomain>,
    order = "ascending"
  ) {
    return this.#sortInnateDomains(InnateDomainsArr, "index", order);
  }
}

export default InnateDomain;
