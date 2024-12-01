export const formatCurrency = (
  value: number | string | null | undefined,
): string => {
  if (value === null || value === undefined) {
    return '';
  }

  let number = 0;
  // Convertir el valor a número si es de tipo string
  if (typeof value === 'string') {
    number = parseFloat(value);
  }

  if (typeof value === 'number') {
    number = value;
  }

  const formattedValue = number
    .toFixed(2)
    .replace(/\./g, ',')
    .replace(/\d(?=(\d{3})+,)/g, '$&.');
  return `$${formattedValue}`;
};
