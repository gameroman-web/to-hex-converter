import { describe, expect, it } from "bun:test";

import { getNewFileName } from "#lib/get-new-file-name";

describe("getNewFileName", () => {
  it("returns correct file name", () => {
    const file = { name: "some-data.txt" } as File;
    expect(getNewFileName(file)).toBe("some-data.hex.txt");
  });
});
