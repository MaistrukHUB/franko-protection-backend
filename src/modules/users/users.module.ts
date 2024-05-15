import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CartModule } from '../cart/cart.module';
import { AdminJwtStrategy } from '../strategy/AdminJwtStrategy';

@Module({
  imports: [SequelizeModule.forFeature([User]), CartModule],
  controllers: [UserController],
  providers: [UserService,AdminJwtStrategy],
  exports: [UserService], // Додайте експорт сервісу, якщо він буде використовуватися в інших модулях.
})
export class UserModule {}
