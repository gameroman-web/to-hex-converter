import { describe, it, expect } from "bun:test";

import { lineToHex } from "~/lib/lineToHex";

describe("lineToHex", () => {
  it("Test 1", () => {
    const converted_line = lineToHex("19.000000	4.000000");
    expect(converted_line).toBe("13 4");
  });

  it("Test 2", () => {
    const converted_line = lineToHex("112.000000	-28.000000");
    expect(converted_line).toBe("70 ffe4");
  });

  it("Test 3", () => {
    const converted_line = lineToHex("-1186.5        1832.29        ");
    expect(converted_line).toBe("fb5e 728");
  });

  it("Test 4", () => {
    const converted_line = lineToHex("1122.72        -1993.6        ");
    expect(converted_line).toBe("463 f836");
  });
});
