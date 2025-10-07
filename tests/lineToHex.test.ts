import { describe, it, expect } from "bun:test";

import { lineToHex } from "~/lib/lineToHex";

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
