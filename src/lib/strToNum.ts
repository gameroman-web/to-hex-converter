export function strToNum(str: string): number {
  const num = Math.round(parseFloat(str));

  if (isNaN(num)) {
    throw new Error("Invalid number string");
  }

  return num;
}
