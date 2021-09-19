import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '@constants/config'
import { CoinDetailsType } from '@customtypes/coins/coin'

const coinDetailsApi = createApi({
  reducerPath: 'coinDetailsApi',
  tagTypes: ['CoinDetails'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchCoinDetails: builder.query<
      CoinDetailsType,
      { ids: string; unit: string }
    >({
      query: ({ ids, unit }) => {
        return {
          url: 'simple/price',
          params: {
            ids,
            vs_currencies: unit,
            include_24hr_vol: true,
            include_24hr_change: true,
          },
        }
      },
    }),
  }),
})

const { useFetchCoinDetailsQuery, useLazyFetchCoinDetailsQuery } =
  coinDetailsApi

export {
  coinDetailsApi,
  useFetchCoinDetailsQuery,
  useLazyFetchCoinDetailsQuery,
}
