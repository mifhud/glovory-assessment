import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from '../users/user.repository';
import { UsersModule } from '../users/users.module';

import { AddressRepository } from './address.repository';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressRepository, UserRepository]),
    UsersModule,
    AuthModule,
  ],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [],
})
export class AddressesModule {}
