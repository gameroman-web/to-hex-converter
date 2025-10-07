import { strToHex } from "./strToHex";

export function lineToHex(line: string): string {
  const [xStr, yStr] = line.trim().split(/\s+/) as [string, string];

  const hexX = strToHex(xStr);
  const hexY = strToHex(yStr);

  return `${hexX} ${hexY}`;
}
