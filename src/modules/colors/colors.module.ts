import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Detail } from '../detail/models/detail.model';
import { Color } from './models/color.module';

@Module({
  imports: [SequelizeModule.forFeature([Detail, Color])],

  controllers: [ColorsController],
  providers: [ColorsService],
  exports: [ColorsService],
})
export class ColorsModule {}
