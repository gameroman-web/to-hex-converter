import { describe, it, expect } from "bun:test";

import { strToHex } from "~/lib/strToHex";

describe("strToHex", () => {
  it("Test 1", () => {
    const converted_str = strToHex("19.000000");
    expect(converted_str).toBe("13");
  });

  it("Test 2", () => {
    const converted_str = strToHex("-28.000000");
    expect(converted_str).toBe("ffe4");
  });

  it("Test 3", () => {
    const converted_str = strToHex("-1186.5");
    expect(converted_str).toBe("fb5e");
  });

  it("Test 4", () => {
    const converted_str = strToHex("-1993.6");
    expect(converted_str).toBe("f836");
  });
});
