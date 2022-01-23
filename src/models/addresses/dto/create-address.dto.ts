import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;
}
