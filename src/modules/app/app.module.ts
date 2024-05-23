import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from 'src/configurations';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { DetailsModule } from '../detail/detail.module';
import { ImagesModule } from '../images/images.module';
import { ColorsModule } from '../colors/colors.module';
import { YearsModule } from '../years/years.module';
import { SalesModule } from '../sales/sales.module';
import { MotorcyclesModule } from '../motorcycles/motorcycles.module';
import { Color } from '../colors/models/color.module';
import { Detail } from '../detail/models/detail.model';
import { Image } from '../images/models/image.model';
import { Motorcycle } from '../motorcycles/models/motorcycle.model';
import { Sale } from '../sales/models/sales.model';
import { Year } from '../years/models/years.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        dialectModule: require('pg'),
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, Color, Detail, Image, Motorcycle, Sale, Year],
      }),
    }),
    UserModule,
    AuthModule,
    TokenModule,
    DetailsModule,
    ImagesModule,
    ColorsModule,
    YearsModule,
    SalesModule,
    MotorcyclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
