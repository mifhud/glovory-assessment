import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();

    const user = new User();
    user.username = createUserDto.username;
    user.salt = salt;
    user.password = await this.hashPassword(createUserDto.password, salt);
    user.email = createUserDto.email;
    user.name = createUserDto.name;

    try {
      return user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
