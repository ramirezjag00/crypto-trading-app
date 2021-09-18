import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '@constants/config'
import { CoinUnitsType, CoinFiltersType } from '@customtypes/coins/coin'

const coinUnitsApi = createApi({
  reducerPath: 'coinUnitsApi',
  tagTypes: ['CoinUnits'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchCoinUnits: builder.query<CoinUnitsType, void>({
      query: () => 'simple/supported_vs_currencies',
      transformResponse: (response: string[]) => {
        const data: CoinUnitsType = {
          btc: '',
          alts: [],
          fiat: [],
        }
        const aedIndex = response.indexOf('aed')
        const zarIndex = response.indexOf('zar')
        response?.forEach((unit, index) => {
          if (unit === CoinFiltersType?.BTC) {
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
