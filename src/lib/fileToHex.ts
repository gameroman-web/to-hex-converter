export function numToHex(num: number, bits: number = 16): string {
  if (bits < 1 || bits > 32) {
    throw new Error("Bits must be between 1 and 32");
  }

  const half = 1n << BigInt(bits - 1);
  const min = -half;
  const max = half - 1n;

  const intNum = BigInt(Math.trunc(num));
  if (intNum < min || intNum > max) {
    throw new Error(`Value ${num} does not fit in ${bits} bits`);
  }

  const mask = (1n << BigInt(bits)) - 1n;
  const masked = intNum & mask;
  const hex = masked.toString(16);
  return hex;
}

export function strToNum(str: string): number {
  const num = Math.round(parseFloat(str));

  if (isNaN(num)) {
    throw new Error("Invalid number string");
  }

  return num;
}

export function strToHex(str: string, bits: number = 16): string {
  const num = strToNum(str);
  const hex = numToHex(num, bits);
  return hex;
}

export function lineToHex(line: string, bits: number = 16): string {
  const [xStr, yStr] = line.trim().split(/\s+/) as [string, string];
  const hexX = strToHex(xStr, bits);
  const hexY = strToHex(yStr, bits);
  return `${hexX} ${hexY}`;
}

export function fileToHex(data: string, bits: number = 16): string {
  const lines = data.trim().split("\n");
  return lines.map((line) => `${lineToHex(line, bits)}\n`).join("");
}
