import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as typeOrmConfig from './database/config/ormconfig';
import { AddressesModule } from './models/addresses/addresses.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AddressesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
