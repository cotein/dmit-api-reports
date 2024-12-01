import { Content } from 'pdfmake/interfaces';

export const customerInfoSection = (customer: any): Content => {
  const customerInfoSection: Content = {
    layout: 'noBorders',
    table: {
      widths: ['auto', 'auto', 'auto', 'auto'],

      body: [
        [
          {
            text: 'Datos del cliente',
            color: 'gray',
            colSpan: 4,
            // border: [false, false, false, false],
          },
          {},
          {},
          {},
        ],

        // Razón social
        [
          {
            text: 'Razón social',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
          },
          {
            text: customer.name.toUpperCase(),
            fillColor: 'white',
            fontSize: 8,
          },
          {
            text: 'CUIT/CUIL',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
          },
          {
            text: customer.afip_number,
            fillColor: 'white',
            fontSize: 8,
          },
        ],
        [
          {
            text: 'Dirección',
            fillColor: '#343a40',
            color: 'white',
            bold: true,
            fontSize: 8,
          },
          {
            text: `${customer.address.street} - ${customer.address.city} - (${customer.address.cp})`,
            fillColor: 'white',
            fontSize: 8,
            colSpan: 3,
          },
        ],
      ],
    },
  };

  return customerInfoSection;
};
