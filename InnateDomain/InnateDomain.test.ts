import { describe, expect, test } from "@jest/globals";
import InnateDomain from "./InnateDomain";

const ip_map_for_testing = {
  "192.168.4.2": 0,
  "192.168.4.3": 1,
  "192.168.6.2": 2,
};

// setup mock Domains

const domain1 = new InnateDomain("192.168.4.2");
const domain2 = new InnateDomain("192.168.4.3");
const domain3 = new InnateDomain("192.168.6.2");

describe("Innate Domain Constructor", () => {
  test("Using a valid IP", () => {
    expect(new InnateDomain("192.168.4.2")).toEqual(domain1);
  });
});
