import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import { Socket } from "net";
import ZeusSocketCollection from "../ZeusSocket/ZeusSocketCollection";
import InnateDomain from "./InnateDomain";

// setup mock Domains

const mockSocket = new Socket();

const domain1 = new InnateDomain("192.168.4.2", mockSocket);
const domain2 = new InnateDomain("192.168.4.3", mockSocket);
const domain3 = new InnateDomain("192.168.6.2", mockSocket);

describe("Innate Domain Constructor", () => {
  test("Using a valid IP", () => {
    expect(new InnateDomain("192.168.4.2", mockSocket)).toEqual(domain1);
  });
  test("Invalid IP = abc.def.ghi.jk", () => {
    const ip = "abc.def.ghi.jk";
    expect(() => {
      new InnateDomain(ip, mockSocket);
    }).toThrow("abc.def.ghi.jk is an invalid IP Address!");
  });
  test("Invalid IP = 1923.168.4.2", () => {
    const ip = "1923.168.4.2";
    expect(() => {
      new InnateDomain(ip, mockSocket);
    }).toThrow("1923.168.4.2 is an invalid IP Address!");
  });
  test("Invalid IP = 192.168.4.4", () => {
    const ip = "192.168.4.4";
    expect(() => {
      new InnateDomain(ip, mockSocket);
    }).toThrow("was not found in InnateDomain's IP Map.");
  });
});

describe("Innate Domain Methods", () => {
  describe("fetchProperty()", () => {
    test("Get IP of domain1", () => {
      expect(domain1.fetchProperty("ip")).toBe("192.168.4.2");
    });
    test("Get index of domain1", () => {
      expect(domain1.fetchProperty("index")).toBe(0);
    });
    test("Get 'foo' of domain1", () => {
      expect(() => {
        domain1.fetchProperty("foo");
      }).toThrow("does not exist in a ZeusSocket Object");
    });
  });

  describe("sortByIndex()", () => {
    let arr: ZeusSocketCollection = new ZeusSocketCollection();
    beforeEach(() => {
      arr.push(domain2);
      arr.push(domain3);
      arr.push(domain1);
    });
    afterEach(() => {
      arr = new ZeusSocketCollection();
    });
    test("Sort by ID ascending", () => {
      arr.sort((s1, s2) => {
        return InnateDomain.sortByIndex(s1, s2);
      });
      expect(arr).toEqual(expect.arrayContaining([domain1, domain2, domain3]));
    });
    test("Sort by ID descending", () => {
      arr.sort(InnateDomain.sortByIndex);
      expect(arr).toEqual(expect.arrayContaining([domain3, domain2, domain1]));
    });
  });
});
