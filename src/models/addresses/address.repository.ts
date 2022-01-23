import { EntityRepository, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Address } from './address.entity';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  async findAddressesByUserId(user_id): Promise<Address[]> {
    try {
      return this.find({ user_id: user_id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createAddress(address: Address): Promise<Address> {
    try {
      return this.save(address);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
