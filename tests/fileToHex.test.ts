import { describe, it, expect } from "bun:test";

import { fileToHex } from "~/lib/fileToHex";

describe("fileToHex", () => {
  it("converts simple decimal file to hex", () => {
    const converted_file = fileToHex(
      `
      19.000000	4.000000
      112.000000	-28.000000
      104.000000	24.000000
      `
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
      `
    );

    expect(converted_file).toBe("463 f836\nfb5e 728\nfdd9 fcda\n20d 9\n");
  });
});
