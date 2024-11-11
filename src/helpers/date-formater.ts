export const dateFormater = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-indexados
  const year = date.getFullYear().toString();

  return `${day}-${month}-${year}`;
};
