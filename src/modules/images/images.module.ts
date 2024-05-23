import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Detail } from '../detail/models/detail.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from './models/image.model';

@Module({
  imports: [SequelizeModule.forFeature([Detail, Image])],
  controllers: [ImagesController],
  providers: [ImagesService],
  // exports: [ImagesService],
})
export class ImagesModule {}
