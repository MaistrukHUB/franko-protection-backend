import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Detail } from '../detail/models/detail.model';
import { Sale } from './models/sales.model';
import { MotorcyclesService } from '../motorcycles/motorcycles.service';

@Module({
  imports: [SequelizeModule.forFeature([Detail, Sale])],
  controllers: [SalesController],
  providers: [SalesService],
  // exports: [MotorcyclesService],
})
export class SalesModule {}
