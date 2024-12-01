import { PrinteableReceiptData } from './types/receipt';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from '../sections/header.section';
import { oneCmInPoints } from '../helpers';
import { footerSection } from '../sections/footer.section';
import { customerInfoSection } from './sections/customer-info-section.report';
import { invoiceToCancelSection } from './sections/invoice-to-cancel-section.report';
import { documentCancelationSection } from './sections/document-cancelation-section.report';
import { CompanyData } from './types/company';
import NumbersToLetters from 'src/helpers/NumbersToLertters';
import { ZERO } from 'src/helpers/constants';

export const receiptReport = (
  company: CompanyData,
  printeableReceiptData: PrinteableReceiptData,
): TDocumentDefinitions => {
  const numbersToLetters = new NumbersToLetters();

  let detail: string | null = null;

  const saldo = printeableReceiptData.receipt.saldo;

  const currency: any = {
    plural: 'PESOS',
    singular: 'PESO',
    centPlural: 'CENTAVOS',
    centSingular: 'CENTAVO',
  };

  if (saldo === ZERO) {
    detail = 'DEUDA CANCELADA';
  } else if (saldo < ZERO) {
    const saldoFavor = Math.abs(saldo);

    const stringNumbersToLetters = numbersToLetters.NumeroALetras(
      saldoFavor,
      currency,
    );

    detail = `SALDO A FAVOR DEL CLIENTE POR ${stringNumbersToLetters.toUpperCase()}`;
  } else {
    const stringNumbersToLetters = numbersToLetters.NumeroALetras(
      saldo,
      currency,
    );

    detail = `SU DEUDA ES DE: ${stringNumbersToLetters.toUpperCase()}`;
  }

  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [oneCmInPoints, 131, oneCmInPoints, 60],

    header: headerSection(company, printeableReceiptData.receipt),

    footer: (currentPage: number, pageCount: number) =>
      footerSection(currentPage, pageCount, detail),

    //contenido del reporte
    content: [
      customerInfoSection(printeableReceiptData.customer),

      invoiceToCancelSection(printeableReceiptData.invoicesToCancel),

      documentCancelationSection(printeableReceiptData.documentsCancelation),
    ],
  };

  return docDefinition;
};
