import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { BasicReportService } from './basic-report.service';
import { Response } from 'express';
import { PrinterService } from 'src/printer/printer.service';
import { prepareImage, resizeBase64Image } from 'src/helpers/image-utils';

@Controller('reports')
export class BasicReportController {
  constructor(
    private readonly basicReportService: BasicReportService,
    private readonly printerService: PrinterService,
  ) {}

  private sendPdfResponse(
    res: Response,
    pdf: PDFKit.PDFDocument,
    title: string,
  ) {
    res.setHeader('Content-Type', 'application/pdf');
    pdf.info.Title = title;
    pdf.pipe(res);
    pdf.end();
  }

  @Post('receipt-report')
  async receipt(@Res() res: Response, @Body() body: any) {
    const printeableData = body;

    const { logo_base64 } = printeableData.company;

    const { pdfName } = printeableData;

    /* const base64Data = prepareImage(logo_base64);

    const resizedLogoBase64 = await resizeBase64Image(base64Data, 150, 100); */

    let base64Data = null;

    if (logo_base64) {
      base64Data = prepareImage(logo_base64);
    }

    const resizedLogoBase64 = base64Data
      ? await resizeBase64Image(base64Data, 150, 100)
      : null;

    const docDefinition = this.basicReportService.receipt(
      printeableData,
      resizedLogoBase64,
    );

    const pdf = this.printerService.createPdf(docDefinition);

    this.sendPdfResponse(res, pdf, pdfName);
  }

  @Get('test')
  www(@Res() res: Response) {
    res.send('Hello World!');
  }
}
