import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Address } from './address.entity';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

interface IUserId {
  userId: string;
}

@ApiBearerAuth()
@ApiTags('address')
@Controller('address')
@UseGuards(AuthGuard())
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Get('list/:user_id')
  @ApiOperation({ summary: 'Get address lists based on user_id' })
  @ApiParam({ name: 'user_id', type: 'string', description: 'ID of user' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiNotFoundResponse({ description: 'User ID is not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getAddressByUserId(
    @Param('user_id') user_id: string,
  ): Promise<{ addresses: Address[] }> {
    const addresses = await this.addressesService.findAddressesByUserId(
      user_id,
    );
    return { addresses };
  }

  @Post()
  @ApiOperation({ summary: 'Create new address, with input of user_id' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Invalid operation' })
  createAddress(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressesService.createAddress(createAddressDto);
  }
}
