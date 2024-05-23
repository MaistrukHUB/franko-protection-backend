import { Module } from '@nestjs/common';
import { DetailController } from './detail.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Detail } from './models/detail.model';
import { Image } from '../images/models/image.model';
import { Sale } from '../sales/models/sales.model';
import { Year } from '../years/models/years.model';
import { Color } from '../colors/models/color.module';
import { DetailsService } from './detail.service';
import { Motorcycle } from '../motorcycles/models/motorcycle.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Detail, Image, Color, Year, Sale, Motorcycle]),
  ],

  controllers: [DetailController],
  providers: [DetailsService],
  // exports: [DetailsService],
})
export class DetailsModule {}
