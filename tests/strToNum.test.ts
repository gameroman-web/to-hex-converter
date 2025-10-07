import { describe, it, expect } from "bun:test";

import { strToNum } from "~/lib/strToNum";

describe("strToNum", () => {
  it("works with positive decimal string", () => {
    expect(strToNum("5")).toBe(5);
    expect(strToNum("19.000000")).toBe(19);
  });

  it("works with negative decimal string", () => {
    expect(strToNum("-1")).toBe(-1);
    expect(strToNum("-28.000000")).toBe(-28);
  });

  it("works with fractional numbers", () => {
    expect(strToNum("1832.29")).toBe(1832);
    expect(strToNum("12.75")).toBe(13);
    expect(strToNum("947.5")).toBe(948);
    expect(strToNum("-1.06288")).toBe(-1);
    expect(strToNum("-1186.5")).toBe(-1186);
    expect(strToNum("-1993.6")).toBe(-1994);
  });

  it("should throw for invalid number string", () => {
    expect(() => strToNum("abc")).toThrow("Invalid number string");
    expect(() => strToNum("")).toThrow("Invalid number string");
  });
});
