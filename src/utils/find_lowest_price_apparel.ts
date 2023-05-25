import { QUALITY_PRICE_MAPPING, SIZE_PRICE_MAPPING } from '../constants.js';
import { IApparel } from '../routers/vendor.js';

export const findLowestPriceApparel = (apparels: IApparel[]) => {
  let minPrice = Number.MAX_VALUE;
  let minPriceApparel: IApparel = apparels[0];

  for (let apparel of apparels) {
    const price =
      apparel.base_price *
      QUALITY_PRICE_MAPPING[apparel.quality] *
      SIZE_PRICE_MAPPING[apparel.size];

    if (minPrice > price) {
      minPrice = price;
      minPriceApparel = apparel;
    }
  }

  return minPriceApparel;
};
