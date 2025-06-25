import { CedearView } from '../interfaces/cedear-view.interface';
import { CedearRaw } from '../interfaces/raw-cedear.interface';

function mapCedear(raw: CedearRaw): CedearView {
  const {
    symbol,
    denominationCcy: currency,
    previousClosingPrice,
    previousSettlementPrice,
    offerPrice,
    bidPrice,
    quantityOffer,
    quantityBid,
    market,
  } = raw;

  const lastClose = previousClosingPrice ?? previousSettlementPrice ?? 0;
  const spread = offerPrice && bidPrice ? offerPrice - bidPrice : 0;

  return {
    symbol,
    currency,
    lastClose,
    offerPrice,
    bidPrice,
    spread,
    quantityOffer,
    quantityBid,
    market,
  };
}
export { mapCedear };
