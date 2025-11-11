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
