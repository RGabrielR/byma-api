// map-cedear.spec.ts
import { mapCedear } from './cedear.mapper';
import { CedearRaw } from '../interfaces/raw-cedear.interface';
import { CedearView } from '../interfaces/cedear-view.interface';

describe('mapCedear', () => {
  it('should map raw cedear data to view model with all fields', () => {
    const raw: CedearRaw = {
      tradeVolume: 0,
      symbol: 'AAPL',
      imbalance: 0,
      previousSettlementPrice: 105,
      offerPrice: 120,
      openInterest: 0,
      vwap: 0,
      numberOfOrders: 0,
      openingPrice: 0,
      tickDirection: 0,
      securityDesc: '',
      securitySubType: '',
      previousClosingPrice: 110,
      settlementType: '2',
      quantityOffer: 15,
      tradingHighPrice: 0,
      denominationCcy: 'USD',
      bidPrice: 100,
      tradingLowPrice: 0,
      market: 'BYMA',
      volumeAmount: 0,
      volume: 0,
      trade: 0,
      securityType: 'CD',
      closingPrice: 0,
      settlementPrice: 0,
      quantityBid: 5,
    };

    const expected: CedearView = {
      symbol: 'AAPL',
      currency: 'USD',
      lastClose: 110,
      offerPrice: 120,
      bidPrice: 100,
      spread: 20,
      quantityOffer: 15,
      quantityBid: 5,
      market: 'BYMA',
    };

    const result = mapCedear(raw);
    expect(result).toEqual(expected);
  });

  it('should fallback to previousSettlementPrice if previousClosingPrice is missing', () => {
    const raw = {
      symbol: 'AAPL',
      denominationCcy: 'USD',
      previousClosingPrice: 99,
      previousSettlementPrice: 99,
      offerPrice: 105,
      bidPrice: 95,
      quantityOffer: 10,
      quantityBid: 5,
      market: 'BYMA',
      tradeVolume: 0,
      imbalance: 0,
      openInterest: 0,
      vwap: 0,
      numberOfOrders: 0,
      openingPrice: 0,
      tickDirection: 0,
      securityDesc: '',
      securitySubType: '',
      settlementType: '2',
      tradingHighPrice: 0,
      tradingLowPrice: 0,
      volumeAmount: 0,
      volume: 0,
      trade: 0,
      securityType: 'CD',
      closingPrice: 0,
      settlementPrice: 0,
    } as CedearRaw;

    const result = mapCedear(raw);
    expect(result.lastClose).toBe(99);
  });

  it('should fallback to 0 if no closing prices are available', () => {
    const raw = {
      symbol: 'AAPL',
      denominationCcy: 'USD',
      offerPrice: 0,
      bidPrice: 0,
      quantityOffer: 0,
      quantityBid: 0,
      market: 'BYMA',
      tradeVolume: 0,
      imbalance: 0,
      openInterest: 0,
      vwap: 0,
      numberOfOrders: 0,
      openingPrice: 0,
      tickDirection: 0,
      securityDesc: '',
      securitySubType: '',
      settlementType: '2',
      tradingHighPrice: 0,
      tradingLowPrice: 0,
      volumeAmount: 0,
      volume: 0,
      trade: 0,
      securityType: 'CD',
      closingPrice: 0,
      settlementPrice: 0,
    } as CedearRaw;

    const result = mapCedear(raw);
    expect(result.lastClose).toBe(0);
    expect(result.spread).toBe(0);
  });
});
