import { Content } from 'pdfmake/interfaces';
import { formatCurrency } from 'src/helpers/currency-format';
import type { InvoicesToCancel } from '../types/receipt';

export const invoiceToCancelSection = (
  invoices: InvoicesToCancel[],
): Content => {
  invoices = invoices ?? [];
  let totalToPayNow: number = 0;
  let totalSaldo: number = 0;

  invoices.forEach((invoice: InvoicesToCancel) => {
    totalSaldo += invoice.saldo;
    totalToPayNow += parseFloat(invoice.toPayNow);
  });

  const invoiceToCancel: Content = {
    //facturas a pagar
    margin: [0, 10, 0, 10],
    layout: 'noBorders',
    table: {
      headerRows: 2,
      widths: [10, 'auto', 'auto', 'auto', 'auto', 'auto'],

      body: [
        [
          {
            text: 'Facturas a pagar',
            color: 'gray',
            colSpan: 6,
          },
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
            text: 'COMPROBANTE',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
            alignment: 'center',
          },

          {
            text: 'IMPORTE ORIGINAL',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
            alignment: 'center',
          },
          {
            text: 'PAGADO TOTAL',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
            alignment: 'center',
          },
          {
            text: 'ESTE PAGO',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
            alignment: 'center',
          },
          {
            text: 'SALDO',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
            alignment: 'center',
          },
        ],
        ...invoices.map((invoice: InvoicesToCancel, i: number) => [
          { text: `${i + 1}`, fontSize: 8, alignment: 'center' },
          { text: invoice.comprobante, fontSize: 8, alignment: 'left' },
          {
            text: `${formatCurrency(invoice.importe)}`,
            fontSize: 8,
            alignment: 'right',
          },
          {
            text: `${formatCurrency(invoice.importe_previo_pagado)}`,
            fontSize: 8,
            alignment: 'right',
          },
          {
            text: `${formatCurrency(invoice.toPayNow)}`,
            fontSize: 8,
            alignment: 'right',
          },
          {
            text: `${formatCurrency(invoice.saldo)}`,
            fontSize: 8,
            alignment: 'right',
          },
        ]),

        [{}, {}, {}, {}, {}, {}],
        // Fila para los totales
        [
          { text: 'TOTAL:', colSpan: 4, fontSize: 8, alignment: 'left' },
          {},
          {},
          {},
          {
            text: ` ${formatCurrency(totalToPayNow)}`,
            fontSize: 8,
            alignment: 'right',
            bold: true,
          },
          {
            text: ` ${formatCurrency(totalSaldo)}`,
            fontSize: 8,
            alignment: 'right',
            bold: true,
          },
        ],
      ],
    },
  };

  return invoiceToCancel;
};
