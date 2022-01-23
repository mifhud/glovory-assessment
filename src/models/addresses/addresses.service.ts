import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserRepository } from '../users/user.repository';
import { UsersService } from '../users/users.service';
import { Address } from './address.entity';

import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,
    private usersService: UsersService,
  ) {}

  async findAddressesByUserId(user_id: string): Promise<Address[]> {
    await this.usersService.findUserById(user_id);

    return this.addressRepository.findAddressesByUserId(user_id);
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const { user_id } = createAddressDto;
    const user = await this.usersService.findUserById(user_id);

    const address = new Address();
    address.user_id = user;
    address.address = createAddressDto.address;
    address.city = createAddressDto.city;

    return this.addressRepository.createAddress(address);
  }
}
