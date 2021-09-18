import React, { useEffect } from 'react'
import {
  CoinDefaultChunkType,
} from '@customtypes/coins/coin'
import { useFetchCoinDetailsQuery } from '@store/api/coinDetails'
import { POLLING_INTERVAL } from '@constants/config'

interface Props {
  activeUnit: string
  coinIds?: CoinDefaultChunkType
  isFetchingCoinIds: boolean
  activeCoinIdsIndex: number
}

const CoinsList: React.FC<Props> = (props) => {
  const {
    activeUnit,
    coinIds = [],
    isFetchingCoinIds,
    activeCoinIdsIndex,
  } = props
  const {
    data: coinDetails,
    refetch,
    // error,
  } = useFetchCoinDetailsQuery(
    {
      ids:
        coinIds?.[activeCoinIdsIndex]?.map((coin) => coin?.id).join(',') || '',
      unit: activeUnit,
    },
    {
      skip: isFetchingCoinIds && !coinIds?.length,
      pollingInterval: POLLING_INTERVAL,
      refetchOnFocus: true,
    },
  )
  console.log('coinDetails', coinDetails)
  // console.log('error', error)

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
  )
}

export default CoinsList
