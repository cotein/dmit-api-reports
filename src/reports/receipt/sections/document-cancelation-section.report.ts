import { Content } from 'pdfmake/interfaces';
import { formatCurrency } from 'src/helpers/currency-format';
import type { DocumentCancelation } from '../types/receipt';

export const documentCancelationSection = (
  documentsCancelation: DocumentCancelation[],
): Content => {
  /*  const totalImport = documentsCancelation.reduce((sum: number, doc: any) => {
    return sum + parseFloat(doc.import);
  }, 0); */
  documentsCancelation = documentsCancelation ?? [];

  let totalImport: number = 0;

  documentsCancelation.forEach((doc: DocumentCancelation) => {
    totalImport += parseFloat(doc.import);
  });

  const documentCancelation: Content = {
    // documentos que cancelan
    margin: [0, 10, 0, 10],
    layout: 'noBorders',
    table: {
      headerRows: 1,
      //widths: Array(10).fill(60), // 10 columnas de 60 unidades de ancho
      widths: [10, '*', '*', '*', '*', '*', '*'],

      body: [
        [
          {
            text: 'Documentos de cancelación',
            color: 'gray',
            colSpan: 7,
          },
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        [
          {
            text: '#',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
            alignment: 'center',
          },

          {
            text: 'TIPO PAGO',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
            alignment: 'center',
          },
          {
            text: 'COMP. #',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
            alignment: 'center',
          },
          {
            text: 'IMPORTE',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
            alignment: 'center',
          },
          {
            text: 'BANCO',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
            alignment: 'center',
          },

          {
            text: 'PROP. CHEQUE',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
            alignment: 'center',
          },
          {
            text: 'VENC. CHEQUE',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
            alignment: 'center',
          },
        ],

        ...documentsCancelation.map((doc: DocumentCancelation, i: number) => [
          { text: `${i + 1}`, fontSize: 8, alignment: 'center' },
          { text: `${doc.payment_type}`, fontSize: 8, alignment: 'left' },
          { text: `${doc.number}`, fontSize: 8, alignment: 'center' },
          {
            text: `${formatCurrency(parseFloat(doc.import))}`,
            fontSize: 8,
            alignment: 'right',
          },
          {
            text: `${doc.bank ? doc.bank : ''}`,
            fontSize: 8,
            alignment: 'left',
          },
          {
            text: `${doc.chequeOwner ? doc.chequeOwner : ''}`,
            fontSize: 8,
            alignment: 'left',
          },
          {
            text: `${doc.chequeExpirate ? doc.chequeExpirate : ''}`,
            fontSize: 8,
            alignment: 'left',
          },
        ]),

        [{}, {}, {}, {}, {}, {}, {}],
        // Fila para el total
        [
          { text: 'TOTAL:', colSpan: 3, fontSize: 8, alignment: 'left' },
          {},
          {},
          {
            text: ` ${formatCurrency(totalImport)}`,
            fontSize: 8,
            alignment: 'right',
            bold: true,
          },
          { text: '', colSpan: 3 },
          {},
          {},
        ],
      ],
    },
  };

  return documentCancelation;
};
