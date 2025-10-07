export function numToHex(num: number, bits: number = 16): string {
  if (bits < 1 || bits > 30) {
    throw new Error("Bits must be between 1 and 30");
  }

  const half = 1 << (bits - 1);
  const min = -half;
  const max = half - 1;

  const intNum = Math.trunc(num);
  if (intNum < min || intNum > max) {
    throw new Error(`Value ${num} does not fit in ${bits} bits`);
  }

  const mask = (1 << bits) - 1;
  const masked = intNum & mask;
  const hex = masked.toString(16);
  return hex;
}
