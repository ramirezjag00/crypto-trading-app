import { CoinDefaultResponseType } from '@customtypes/coins/coin'

const asyncFilter = async (
  arr: CoinDefaultResponseType[],
  predicate: (obj: CoinDefaultResponseType) => boolean,
): Promise<CoinDefaultResponseType[]> => {
  const results = await Promise.all(arr.map(predicate))

  return arr.filter((_v, index) => results[index])
}

export default asyncFilter
