import { Injectable } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { receiptReport } from 'src/reports/receipt/receipt.report';
import { PrinteableReceiptData } from 'src/reports/receipt/types/receipt';
import { CompanyData } from 'src/reports/receipt/types/company';

@Injectable()
export class BasicReportService {
  constructor(private readonly printerService: PrinterService) {}

  receipt(
    printeableData: PrinteableReceiptData,
    logo: string,
  ): TDocumentDefinitions {
    const { name, phone1, address, phone2, email, webSite } =
      printeableData.company;

    const companyData: CompanyData = {
      name: name,
      address: `${address.street}-${address.localidad}-${address.cp}-${address.city}`,
      phone1: phone1,
      phone2: phone2,
      email: email,
      webSite: webSite,
      logo_base64: logo,
    };

    const pdf = receiptReport(
      companyData,
      printeableData,
      /* printeableData.customer,
      printeableData.invoicesToCancel,
      printeableData.documentsCancelation, */
    );

    return pdf;
  }
}
