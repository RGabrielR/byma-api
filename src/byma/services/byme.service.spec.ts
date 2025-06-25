import { Test, TestingModule } from '@nestjs/testing';
import { BymaService } from './byma.service';
import { ConfigService } from '@nestjs/config';
import { CustomHttpService } from '../../shared/http/http.service';
import { CedearRaw } from '../interfaces/raw-cedear.interface';
import { CedearView } from '../interfaces/cedear-view.interface';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('BymaService', () => {
  let service: BymaService;

  const mockRawData: CedearRaw[] = [
    {
      tradeVolume: 0,
      symbol: 'AAPL',
      imbalance: 0,
      previousSettlementPrice: 100,
      offerPrice: 110,
      openInterest: 0,
      vwap: 0,
      numberOfOrders: 0,
      openingPrice: 0,
      tickDirection: -1,
      securityDesc: '',
      securitySubType: '',
      previousClosingPrice: 100,
      settlementType: '2',
      quantityOffer: 10,
      tradingHighPrice: 0,
      denominationCcy: 'USD',
      bidPrice: 90,
      tradingLowPrice: 0,
      market: 'BYMA',
      volumeAmount: 0,
      volume: 0,
      trade: 0,
      securityType: 'CD',
      closingPrice: 0,
      settlementPrice: 0,
      quantityBid: 5,
    },
  ];

  const mockConfigService = {
    get: jest.fn().mockReturnValue('https://fake-url.com'),
  };

  const mockCustomHttpService = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    mockedAxios.post.mockResolvedValue({ data: mockRawData });
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BymaService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: CustomHttpService, useValue: mockCustomHttpService },
      ],
    }).compile();
    service = module.get<BymaService>(BymaService);
  });

  it('should be defined', async () => {
    mockCustomHttpService.post.mockResolvedValue({ data: mockRawData });
    const result: Promise<CedearView[]> =
      (await service.getCedears()) as Promise<CedearView[]>;
    const expected: CedearView[] = [
      {
        symbol: 'AAPL',
        currency: 'USD',
        lastClose: 100,
        offerPrice: 110,
        bidPrice: 90,
        spread: 20,
        quantityOffer: 10,
        quantityBid: 5,
        market: 'BYMA',
      },
    ];

    expect(result).toEqual(expected);
    expect(mockConfigService.get).toHaveBeenCalledWith('URL_CEDEARS');
  });

  it('should throw an error if no data is received from the API', async () => {
    mockedAxios.post.mockResolvedValue({ data: null });
    await expect(service.getCedears()).rejects.toThrow(
      'No data received from the API',
    );
  });
});
