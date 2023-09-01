import { describe, expect, test } from "@jest/globals";
import InnateDomain from "./InnateDomain";

// setup mock Domains

const domain1 = new InnateDomain("192.168.4.2");
const domain2 = new InnateDomain("192.168.4.3");
const domain3 = new InnateDomain("192.168.6.2");

describe("Innate Domain Constructor", () => {
  test("Using a valid IP", () => {
    expect(new InnateDomain("192.168.4.2")).toEqual(domain1);
  });
  test("Invalid IP = abc.def.ghi.jk", () => {
    const ip = "abc.def.ghi.jk";
    expect(() => {
      new InnateDomain(ip);
    }).toThrow("abc.def.ghi.jk is an invalid IP Address!");
  });
  test("Invalid IP = 1923.168.4.2", () => {
    const ip = "1923.168.4.2";
    expect(() => {
      new InnateDomain(ip);
    }).toThrow("1923.168.4.2 is an invalid IP Address!");
  });
  test("Invalid IP = 192.168.4.4", () => {
    const ip = "192.168.4.4";
    expect(() => {
      new InnateDomain(ip);
    }).toThrow("was not found in InnateDomainIPMap");
  });
});

describe("Innate Domain Methods", () => {
  describe("fetchProperty", () => {
    test("Get IP of domain1", () => {
      expect(domain1.fetchProperty("ip")).toBe("192.168.4.2");
    });
    test("Get index of domain1", () => {
      expect(domain1.fetchProperty("index")).toBe(0);
    });
    test("Get 'foo' of domain1", () => {
      expect(domain1.fetchProperty("foo")).toThrow(
        "does not exist in an InnateDomain"
      );
    });
  });
});
