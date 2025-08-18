export function lineToHex(line: string): string {
  const [xStr, yStr] = line.trim().split(/\s+/) as [string, string];

  const x = parseInt(xStr.replace(/\.000000$/, ""));
  const hexX = (x & 0xffff).toString(16);

  const y = parseInt(yStr.replace(/\.000000$/, ""));
  const hexY = (y & 0xffff).toString(16);

  return `${hexX} ${hexY}`;
}
