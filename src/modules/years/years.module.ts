import { Module } from '@nestjs/common';
import { YearsService } from './years.service';
import { YearsController } from './years.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Detail } from '../detail/models/detail.model';
import { Year } from './models/years.model';

@Module({
  imports: [SequelizeModule.forFeature([Detail, Year])],
  controllers: [YearsController],
  providers: [YearsService],
  // exports: [YearsService],
})
export class YearsModule {}
