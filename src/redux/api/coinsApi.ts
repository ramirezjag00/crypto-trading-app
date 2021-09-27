import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  CoinDefaultResponseType,
  CoinDefaultChunkType,
  CoinsResult,
} from '@customtypes/coins/coin'
import { BASE_URL, MAX_NUM_COINS_REQUEST } from '@constants/config'

const coinsApi = createApi({
  reducerPath: 'coinsApi',
  tagTypes: ['Coins'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchCoins: builder.query<CoinsResult, void>({
      query: () => 'coins/list?include_platform=false',
      transformResponse: (response: CoinDefaultResponseType[]) => {
        let i: number
        let j: number
        let temporary: CoinDefaultResponseType[] = []
        const result: CoinDefaultChunkType = []

        for (i = 0, j = response?.length; i < j; i += MAX_NUM_COINS_REQUEST) {
          temporary = response?.slice(i, i + MAX_NUM_COINS_REQUEST)
          result?.push(temporary)
        }
        return {
          coinListData: response,
          coinListPaginated: result,
        }
      },
    }),
  }),
})

const { useFetchCoinsQuery } = coinsApi

export { coinsApi, useFetchCoinsQuery }
