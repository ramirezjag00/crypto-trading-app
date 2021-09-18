import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '@constants/config'
import { CoinUnits } from '@customtypes/coins/coin'

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
        response?.forEach((unit, index) => {
          if (unit === 'btc') {
            data.btc = unit
          } else if (index > 1 && index < aedIndex) {
            data.alts = [...data?.alts, unit]
          } else {
            data.fiat = [...data?.fiat, unit]
          }
        })
        return data
      },
    }),
  }),
})

const { useFetchCoinUnitsQuery } = coinUnitsApi

export { coinUnitsApi, useFetchCoinUnitsQuery }
