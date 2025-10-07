import { describe, it, expect } from "bun:test";

import { strToHex } from "~/lib/strToHex";

describe("strToHex", () => {
  it("converts positive decimal string to hex", () => {
    expect(strToHex("19.000000")).toBe("13");
  });

  it("converts negative decimal string to two's complement hex", () => {
    expect(strToHex("-1")).toBe("ffff");
    expect(strToHex("-28.000000")).toBe("ffe4");
  });

  it("converts negative decimal strings with fractions to two's complement hex", () => {
    expect(strToHex("-1186.5")).toBe("fb5e");
    expect(strToHex("-1993.6")).toBe("f836");
  });

  it("should work with custom bits", () => {
    expect(strToHex("0", 8)).toBe("0");
    expect(strToHex("1", 8)).toBe("1");
    expect(strToHex("15", 8)).toBe("f");
    expect(strToHex("16", 8)).toBe("10");
    expect(strToHex("127", 8)).toBe("7f");
    expect(strToHex("-128", 8)).toBe("80");
    expect(strToHex("-1", 8)).toBe("ff");
  });

  it("should throw for overflow", () => {
    expect(() => strToHex("128", 8)).toThrow(
      "Value 128 does not fit in 8 bits"
    );
    expect(() => strToHex("-129", 8)).toThrow(
      "Value -129 does not fit in 8 bits"
    );
  });

  it("should throw for invalid number string", () => {
    expect(() => strToHex("abc")).toThrow("Invalid number string");
    expect(() => strToHex("")).toThrow("Invalid number string");
  });

  it("should throw for invalid bits", () => {
    expect(() => strToHex("1", 0)).toThrow("Bits must be between 1 and 30");
    expect(() => strToHex("1", 2)).not.toThrow();
    expect(() => strToHex("1", 30)).not.toThrow();
    expect(() => strToHex("1", 33)).toThrow("Bits must be between 1 and 30");
  });
});
