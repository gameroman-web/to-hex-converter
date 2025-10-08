import { strToHex } from "./strToHex";

export function lineToHex(line: string, bits: number = 16): string {
  const [xStr, yStr] = line.trim().split(/\s+/) as [string, string];
  const hexX = strToHex(xStr, bits);
  const hexY = strToHex(yStr, bits);
  return `${hexX} ${hexY}`;
}
