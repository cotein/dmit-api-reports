export const lineTopTrue = {
  hLineWidth: function (i: number, node: any = {}) {
    if (node.table && node.table.body) {
      if (i === 0) {
        return 3;
      }
      return 0;
      //return i === node.table.headerRows ? 2 : 1;
    }
    return 0; // Valor por defecto si node.table o node.table.body no están definidos
  },
  vLineWidth: function (i: number = 0) {
    return 0; // Asegúrate de que el valor de retorno sea consistente
  },
  vLineColor: function (i: number = 0) {
    return 'white'; // Asegúrate de que el valor de retorno sea consistente
  },
  hLineColor: function (i: number) {
    return i === 0 ? 'black' : 'white';
  },
  /* paddingLeft: function (i: number) {
    return i === 0 ? 0 : 8;
  },
  paddingRight: function (i: number, node: any = {}) {
    return i === (node.table ? node.table.widths.length - 1 : 0) ? 0 : 1;
  }, */
};
