import { describe, it, expect } from "bun:test";

import { fileToHex } from "~/lib/fileToHex";

describe("fileToHex", () => {
  it("Test 1", () => {
    const converted_file = fileToHex(
      `
      19.000000	4.000000
      112.000000	-28.000000
      104.000000	24.000000
      `
    );

    expect(converted_file).toBe("13 4\n70 ffe4\n68 18\n");
  });
});
