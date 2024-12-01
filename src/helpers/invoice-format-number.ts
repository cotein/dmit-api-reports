/**
 * Formatea dos números en un string con el formato 000-00000000.
 * @param {number} part1 - El primer número (3 dígitos).
 * @param {number} part2 - El segundo número (8 dígitos).
 * @returns {string} - El string formateado.
 */
export const formatReceiptNumber = (part1: number, part2: number): string => {
  const formattedPart1 = part1.toString().padStart(3, '0');
  const formattedPart2 = part2.toString().padStart(8, '0');
  return `${formattedPart1}-${formattedPart2}`;
};
