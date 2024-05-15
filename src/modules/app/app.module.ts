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
import { Cart } from '../cart/models/cart.model';
import { CartProduct } from '../cartProduct/models/cartProduct.model';
import { CartModule } from '../cart/cart.module';
import { CartProductModule } from '../cartProduct/cartProduct.module';

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
        models: [User, , Cart, CartProduct, ],
      }),
    }),
    UserModule,
    AuthModule,
    TokenModule,
    CartModule,
    CartProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
