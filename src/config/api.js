

import { apikeys } from "./apikeys";


export const CoinList = (currency) =>
  `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=${currency}&api_key=${apikeys}`;

export const SingleCoin = (id) =>
  `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${id}&api_key=${apikeys}`;

export const HistoricalChart = (id, currency,days=365) =>
  `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${id}&tsym=${currency}&limit=${days}&aggregate=1&e=CCCAGG`

export const TrendingCoins = (currency) =>
  `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=${currency}&api_key=${apikeys}`;

