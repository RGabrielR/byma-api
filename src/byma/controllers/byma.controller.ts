import { Controller, Get } from '@nestjs/common';
import { BymaService } from '../services/byma.service';
import { CedearDto } from '../dtos/cedear.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('byma')
export class BymaController {
  constructor(private readonly bymaService: BymaService) {}
  @ApiOkResponse({
    description: 'Lista de CEDEARs procesados desde BYMA',
    type: CedearDto,
    isArray: true,
  })
  @Get('cedears')
  getCedears(): Promise<CedearDto[]> {
    return this.bymaService.getCedears();
  }
}
