import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { AppError } from 'src/common/errors/errors';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  async findUserById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      dto.password = await this.hashPassword(dto.password);
      await this.userRepository.create({
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        password: dto.password,
        role: dto.role ? dto.role : (dto.role = 'user'),
      });
      return dto;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async publicUser(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { email },
        attributes: {
          exclude: ['password', 'id', 'role', 'createdAt', 'updatedAt'],
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    try {
      const checkUser = this.findUserByEmail(email);
      if (!checkUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
      await this.userRepository.update(dto, { where: { email } });
      return dto;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async deleteUsers(user: User): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { email: user.email } });
      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async checkAdmin(): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }
}
