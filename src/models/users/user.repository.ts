import { EntityRepository, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';

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

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
