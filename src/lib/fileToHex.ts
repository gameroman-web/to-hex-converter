import { lineToHex } from "./lineToHex";

export function fileToHex(data: string): string {
  const lines = data.trim().split("\n");
  const result: string[] = [];

  for (const line of lines) {
    const converted_line = lineToHex(line);

    result.push(`${converted_line}\n`);
  }

  return result.join("");
}
