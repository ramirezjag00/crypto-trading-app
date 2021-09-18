import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '@constants/config'
import { CoinUnits, CoinFilters } from '@customtypes/coins/coin'

const coinUnitsApi = createApi({
  reducerPath: 'coinUnitsApi',
  tagTypes: ['CoinUnits'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchCoinUnits: builder.query<CoinUnits, void>({
      query: () => 'simple/supported_vs_currencies',
      transformResponse: (response: string[]) => {
        const data: CoinUnits = {
          btc: '',
          alts: [],
          fiat: [],
        }
        const aedIndex = response.indexOf('aed')
        const zarIndex = response.indexOf('zar')
        response?.forEach((unit, index) => {
          if (unit === CoinFilters?.BTC) {
            data.btc = unit
          } else if (index >= aedIndex && index <= zarIndex) {
            data.fiat = [...data?.fiat, unit]
          } else {
            data.alts = [...data?.alts, unit]
          }
        })
        return data
      },
    }),
  }),
})

const { useFetchCoinUnitsQuery } = coinUnitsApi

export { coinUnitsApi, useFetchCoinUnitsQuery }
