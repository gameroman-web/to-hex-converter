export function getNewFileName(file: File | null): string {
  if (!file) return "output.hex.txt";
  return file.name.replace(".txt", ".hex.txt");
}
