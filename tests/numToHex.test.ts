import { describe, it, expect } from "bun:test";

import { numToHex } from "~/lib/numToHex";

describe("numToHex", () => {
  it("converts positive decimal string to hex", () => {
    expect(numToHex(19)).toBe("13");
  });

  it("converts negative decimal string to two's complement hex", () => {
    expect(numToHex(-1)).toBe("ffff");
    expect(numToHex(-28)).toBe("ffe4");
  });

  it("should work with custom bits", () => {
    expect(numToHex(0, 8)).toBe("0");
    expect(numToHex(1, 8)).toBe("1");
    expect(numToHex(15, 8)).toBe("f");
    expect(numToHex(16, 8)).toBe("10");
    expect(numToHex(127, 8)).toBe("7f");
    expect(numToHex(-128, 8)).toBe("80");
    expect(numToHex(-1, 8)).toBe("ff");
  });

  it("should throw for overflow", () => {
    expect(() => numToHex(128, 8)).toThrow("Value 128 does not fit in 8 bits");
    expect(() => numToHex(-129, 8)).toThrow(
      "Value -129 does not fit in 8 bits"
    );
  });

  it("should work for 16 bits", () => {
    expect(numToHex(0, 16)).toBe("0");
    expect(numToHex(1, 16)).toBe("1");
    expect(numToHex(15, 16)).toBe("f");
    expect(numToHex(16, 16)).toBe("10");
    expect(numToHex(127, 16)).toBe("7f");
    expect(numToHex(128, 16)).toBe("80");
    expect(numToHex(255, 16)).toBe("ff");
    expect(numToHex(256, 16)).toBe("100");
    expect(numToHex(32767, 16)).toBe("7fff");
    expect(numToHex(-32768, 16)).toBe("8000");
    expect(numToHex(-1, 16)).toBe("ffff");
  });

  it("should work for 32 bits", () => {
    expect(numToHex(0, 32)).toBe("0");
    expect(numToHex(1, 32)).toBe("1");
    expect(numToHex(15, 32)).toBe("f");
    expect(numToHex(16, 32)).toBe("10");
    expect(numToHex(255, 32)).toBe("ff");
    expect(numToHex(256, 32)).toBe("100");
    expect(numToHex(32767, 32)).toBe("7fff");
    expect(numToHex(32768, 32)).toBe("8000");
    expect(numToHex(2147483647, 32)).toBe("7fffffff");
    expect(numToHex(-2147483648, 32)).toBe("80000000");
    expect(numToHex(-1, 32)).toBe("ffffffff");
  });

  it("should not throw for valid bits", () => {
    expect(() => numToHex(1, 2)).not.toThrow();
    expect(() => numToHex(1, 31)).not.toThrow();
    expect(() => numToHex(1, 32)).not.toThrow();
  });

  it("should throw for invalid bits", () => {
    expect(() => numToHex(1, 0)).toThrow("Bits must be between 1 and 32");
    expect(() => numToHex(1, 33)).toThrow("Bits must be between 1 and 32");
  });
});
