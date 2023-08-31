import { InnateDomainIPMap } from "../consts/consts";

class InnateDomain {
  ip: string;
  index: number;

  constructor(ip: string) {
    this.ip = ip;
    this.index = InnateDomainIPMap[ip];
  }

  // Getters

  get getIP() {
    return this.ip;
  }

  get getIndex() {
    return this.index;
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

  static sortInnateDomains(
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
    return this.sortInnateDomains(InnateDomainsArr, "index", order);
  }
}

export default InnateDomain;
