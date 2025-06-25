import { Injectable } from '@nestjs/common';
import { CustomHttpService } from '../../shared/http/http.service';
import axios from 'axios';
import * as https from 'https';
import { CedearView } from '../interfaces/cedear-view.interface';
import { CedearRaw } from '../interfaces/raw-cedear.interface';
import { mapCedear } from '../mappers/cedear.mapper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BymaService {
  private readonly headers = {
    Authorization: 'Bearer ...',
  };

  constructor(
    private readonly http: CustomHttpService,
    private readonly configService: ConfigService,
  ) {}

  async getCedears(): Promise<any> {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const url = this.configService.get<string>('URL_CEDEARS') || '';
    const body = { excludeZeroPxAndQty: true, T1: true, T0: false };
    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'application/json' },
      httpsAgent: agent,
    });
    if (!response || !response.data) {
      throw new Error('No data received from the API');
    }
    const rawData: CedearRaw[] = response.data as CedearRaw[];
    const mapped: CedearView[] = rawData.map(mapCedear);
    return mapped;
  }
}
