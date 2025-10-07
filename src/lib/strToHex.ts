export function strToHex(str: string): string {
  const num = Math.round(parseFloat(str));
  const hex = (num & 0xffff).toString(16);
  return hex;
}
