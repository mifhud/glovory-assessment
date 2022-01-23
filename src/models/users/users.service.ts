import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async findUserById(id): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User id is not found');
    }

    return user;
  }
}
