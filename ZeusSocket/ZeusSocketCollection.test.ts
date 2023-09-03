import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import { Socket } from "net";
import ZeusSocketCollection from "./ZeusSocketCollection";
import InnateDomain from "../InnateDomain/InnateDomain";

const mockSocket = new Socket();

describe("ZeusSocketCollection constructor", () => {
  test("Collection of InnateDomain", () => {
    expect(new ZeusSocketCollection("InnateDomain")).toBeInstanceOf(
      ZeusSocketCollection
    );
  });
  test("Collection of IllegalSockets", () => {
    expect(() => {
      new ZeusSocketCollection("IllegalSockets");
    }).toThrowError("is not a valid collection type!");
  });
});

describe("ZeusSocketCollection methods", () => {
  describe("validCollectionType()", () => {
    test("InnateDomain", () => {
      expect(
        ZeusSocketCollection.validCollectionType("InnateDomain")
      ).toBeTruthy();
    });
    test("IllegalSocket", () => {
      expect(
        ZeusSocketCollection.validCollectionType("IllegalSocket")
      ).toBeFalsy();
    });
  });

  describe("clear()", () => {
    const d1 = new InnateDomain("192.168.4.2", mockSocket);
    const d2 = new InnateDomain("192.168.4.3", mockSocket);
    const d3 = new InnateDomain("192.168.6.2", mockSocket);
    const collection = new ZeusSocketCollection("InnateDomain", d1, d2, d3);
    test("Length === 3 before clear()", () => {
      expect(collection.length).toEqual(3);
    });
    test("Length === 0 after clear()", () => {
      collection.clear();
      expect(collection.length).toEqual(0);
    });
  });
});
