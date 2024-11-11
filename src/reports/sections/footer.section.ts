import type { Content } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
  detail: string | null = null,
): Content => {
  const columns = detail
    ? [
        {
          text: detail,
          alignment: 'left',
          fontSize: 8,
          margin: [0, 10, 0, 0],
          bold: true,
        },
        {
          text: `Página ${currentPage.toString()} de ${pageCount}`,
          bold: true,
          fontSize: 8,
          alignment: 'right',
          margin: [0, 10, 10, 0],
        },
      ]
    : [
        {
          text: `Página ${currentPage.toString()} de ${pageCount}`,
          bold: true,
          fontSize: 8,
          alignment: 'right',
          margin: [0, 10, 10, 0],
        },
      ];

  return {
    margin: [10, 15, 10, 31],
    layout: 'lineTopTrue',
    table: {
      widths: detail ? ['*', 60] : ['*'],
      body: [columns],
    },
  };
};
