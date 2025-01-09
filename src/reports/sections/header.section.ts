import type { Content } from 'pdfmake/interfaces';
import { CompanyData } from './../receipt/types/company';
import { ReceiptData } from '../receipt/types/receipt';
import { formatReceiptNumber } from 'src/helpers/invoice-format-number';
import { dateFormater } from 'src/helpers';
import { BG_GRAY } from 'src/helpers/constants';

export const headerSection = (
  company: CompanyData,
  receiptData: ReceiptData,
): Content => {
  const { name, address, phone1, phone2, email, webSite, logo_base64 } =
    company;

  const content: Content[] = [];

  const logoColumn = logo_base64
    ? { image: logo_base64, width: 150, height: 100 }
    : {};

  if (name) {
    content.push(
      { text: 'Nombre: ', bold: true, fontSize: 7 },
      { text: name, fontSize: 7 },
      '\n',
    );
  }
  if (address) {
    content.push(
      { text: 'Dirección: ', bold: true, fontSize: 7 },
      { text: address, fontSize: 7 },
      '\n',
    );
  }
  if (phone1) {
    content.push(
      { text: 'Teléfono: ', bold: true, fontSize: 7 },
      { text: phone1, fontSize: 7 },
      '\n',
    );
  }
  if (phone2) {
    content.push(
      { text: 'Teléfono: ', bold: true, fontSize: 7 },
      { text: phone2, fontSize: 7 },
      '\n',
    );
  }
  if (email) {
    content.push(
      { text: 'Email: ', bold: true, fontSize: 7 },
      { text: email, fontSize: 7 },
      '\n',
    );
  }
  if (webSite) {
    content.push(
      { text: 'Sitio Web: ', bold: true, fontSize: 7 },
      { text: webSite, fontSize: 7 },
      '\n',
    );
  }

  return {
    margin: [10, 15, 10, 31],
    layout: 'lineBottonTrue',
    table: {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 1,
      widths: ['*'],

      body: [
        [
          {
            //border: [false, false, false, true],
            columns: [
              logoColumn,
              {
                columns: [
                  {
                    width: '*',
                    fontSize: 10,
                    text: content,
                  },
                ],
              },
              {
                height: 100,
                table: {
                  // headers are automatically repeated if the table spans over multiple pages
                  // you can declare how many rows should be treated as headers
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      {
                        text: 'RECIBO N°',
                        bold: true,
                        fontSize: 16,
                        fillColor: BG_GRAY,
                        color: 'white',
                      },
                      {
                        text: formatReceiptNumber(
                          receiptData.pto_vta_receipt,
                          receiptData.number,
                        ),
                        bold: true,
                        fontSize: 16,
                        fillColor: BG_GRAY,
                        color: 'white',
                      },
                    ],
                    [
                      { text: 'Fecha' },
                      {
                        text: dateFormater(receiptData.date),
                        bold: true,
                        alignment: 'right',
                      },
                    ],
                  ],
                },
                layout: 'noBorders',
              },
            ],
            // optional space between columns
            columnGap: 10,
          },
        ],
      ],
    },
  };
  // try here http://pdfmake.org/playground.html
};
