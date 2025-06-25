import { ApiProperty } from '@nestjs/swagger';

export class CedearDto {
  @ApiProperty()
  symbol: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  lastClose: number;

  @ApiProperty()
  offerPrice: number;

  @ApiProperty()
  bidPrice: number;

  @ApiProperty()
  spread: number;

  @ApiProperty()
  quantityOffer: number;

  @ApiProperty()
  quantityBid: number;

  @ApiProperty()
  market: string;
}
