import { Controller } from '@nestjs/common';
import { MotorcyclesService } from './motorcycles.service';

@Controller('motorcycles')
export class MotorcyclesController {
  constructor(private readonly motorcyclesService: MotorcyclesService) {}
}
