import { describe, it, expect } from "bun:test";

import {
  numToHex,
  strToNum,
  strToHex,
  lineToHex,
  fileToHex,
} from "~/lib/fileToHex";

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
      "Value -129 does not fit in 8 bits",
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
      "Value 128 does not fit in 8 bits",
    );
    expect(() => strToHex("-129", 8)).toThrow(
      "Value -129 does not fit in 8 bits",
    );
  });

  it("should throw for invalid number string", () => {
    expect(() => strToHex("abc")).toThrow("Invalid number string");
    expect(() => strToHex("")).toThrow("Invalid number string");
  });

  it("should not throw for valid bits", () => {
    expect(() => strToHex("1", 2)).not.toThrow();
    expect(() => strToHex("1", 31)).not.toThrow();
    expect(() => strToHex("1", 32)).not.toThrow();
  });

  it("should throw for invalid bits", () => {
    expect(() => strToHex("1", 0)).toThrow("Bits must be between 1 and 32");
    expect(() => strToHex("1", 33)).toThrow("Bits must be between 1 and 32");
  });
});

describe("lineToHex", () => {
  it("converts positive decimal line to hex", () => {
    expect(lineToHex("19.000000	4.000000")).toBe("13 4");
  });

  it("converts mixed positive and negative decimal line to hex", () => {
    expect(lineToHex("112.000000	-28.000000")).toBe("70 ffe4");
  });

  it("handles lines with fractional numbers and varying whitespace", () => {
    expect(lineToHex("-1186.5        1832.29        ")).toBe("fb5e 728");
    expect(lineToHex("1122.72        -1993.6        ")).toBe("463 f836");
    expect(lineToHex("-1.06288       560.854        ")).toBe("ffff 231");
  });
});

describe("fileToHex", () => {
  it("converts simple decimal file to hex", () => {
    const converted_file = fileToHex(
      `
      19.000000	4.000000
      112.000000	-28.000000
      104.000000	24.000000
      `,
    );

    expect(converted_file).toBe("13 4\n70 ffe4\n68 18\n");
  });

  it("handles files with fractional numbers and varying whitespace", () => {
    const converted_file = fileToHex(
      `
      1122.72        -1993.6        
      -1186.5        1832.29        
      -550.59        -805.904       
      525.317        9.41666        
      `,
    );

    expect(converted_file).toBe("463 f836\nfb5e 728\nfdd9 fcda\n20d 9\n");
  });
});
