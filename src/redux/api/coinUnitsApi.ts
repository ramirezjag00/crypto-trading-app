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
    }),
  }),
})
