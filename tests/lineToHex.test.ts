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
});
