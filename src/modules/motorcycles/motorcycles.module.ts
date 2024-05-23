import { Module } from '@nestjs/common';
import { MotorcyclesService } from './motorcycles.service';
import { MotorcyclesController } from './motorcycles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Detail } from '../detail/models/detail.model';
import { Motorcycle } from './models/motorcycle.model';

@Module({
  imports: [SequelizeModule.forFeature([Detail, Motorcycle])],
  controllers: [MotorcyclesController],
  providers: [MotorcyclesService],
  // exports: [MotorcyclesService],
})
export class MotorcyclesModule {}
