import { lineToHex } from "./lineToHex";

export function fileToHex(data: string, bits: number = 16): string {
  const lines = data.trim().split("\n");
  return lines.map((line) => `${lineToHex(line, bits)}\n`).join("");
}
