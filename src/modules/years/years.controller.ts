import { Controller } from '@nestjs/common';
import { YearsService } from './years.service';

@Controller('years')
export class YearsController {
  constructor(private readonly yearsService: YearsService) {}
}
