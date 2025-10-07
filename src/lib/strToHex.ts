import { strToNum } from "./strToNum";
import { numToHex } from "./numToHex";

export function strToHex(str: string, bits: number = 16): string {
  const num = strToNum(str);
  const hex = numToHex(num, bits);
  return hex;
}
