import { PartialType } from '@nestjs/swagger';
import { CreateBasicReportDto } from './create-basic-report.dto';

export class UpdateBasicReportDto extends PartialType(CreateBasicReportDto) {}
