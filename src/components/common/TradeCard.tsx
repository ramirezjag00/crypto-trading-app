import React, { memo, useEffect, useRef } from 'react'
import {
  Keyboard,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native'

import theme from '@constants/theme'
import { CoinOrderType, CoinTradeType } from '@customtypes/coins/coin'
import Button from './Button'
import QuantityController from './QuantityController'
import { useLazyFetchCoinDetailsQuery } from '@store/api/coinDetails'
import { POLLING_INTERVAL } from '@constants/config'
import { useAppDispatch } from '@utils/hooks/store'
import { removeCoinTrade, upsertCoinTrade } from '@store/api/coinTrades'
import { unixDate } from '@utils/dataTime'
import { useIsFocused } from '@react-navigation/core'

interface Props {
  buttonLabel: string
  onPressButton: (coinTrade: CoinTradeType | CoinOrderType) => void
  activeCoin?: CoinTradeType
  containerStyle?: StyleProp<ViewStyle>
}

const TradeCard: React.FC<Props> = (props) => {
  const { activeCoin, onPressButton, buttonLabel, containerStyle } = props
  const isFocused = useIsFocused()
  const dispatch = useAppDispatch()
  const [trigger, result] = useLazyFetchCoinDetailsQuery({
    pollingInterval: isFocused ? POLLING_INTERVAL : 0,
    refetchOnFocus: true,
  })
  const quantity = useRef<number>(0)

  const coin24hChg = (
    result?.data && activeCoin
      ? result?.data?.[activeCoin?.id]?.[`${activeCoin?.unit}_24h_change`]
      : 0
  ).toFixed(2)

  const currentPrice =
    result?.data && activeCoin
      ? result?.data?.[activeCoin?.id]?.[activeCoin?.unit]
      : 0

  const activeCoinQuantity = activeCoin?.amount
    ? activeCoin?.amount
    : quantity?.current

  useEffect(() => {
    if (activeCoin) {
      trigger({
        ids: activeCoin?.id,
        unit: activeCoin?.unit,
      })
    }
  }, [activeCoin, trigger])

  const onQuantityChange = (coinNumber: number) => {
    if (activeCoin?.amount) {
      dispatch(upsertCoinTrade({ ...activeCoin, amount: coinNumber }))
    } else {
      quantity.current = coinNumber
    }
  }

  const onAmountQuantityChange =
    (isIncreasing?: boolean, amount?: number) => (): void => {
      if (amount) {
        onQuantityChange(amount)
      } else if (!amount && isIncreasing) {
        onQuantityChange(activeCoinQuantity + 1)
      } else if (!isIncreasing) {
        const coinQuantity = activeCoinQuantity ? activeCoinQuantity - 1 : 0
        if (buttonLabel === 'Purchase' && !coinQuantity) {
          onRemoveCoin()
        } else {
          onQuantityChange(coinQuantity)
        }
      }
    }

  const onAddCoin = (): void => {
    if (!!activeCoin && !!activeCoinQuantity) {
      if (buttonLabel === 'Purchase') {
        onPressButton({
          ...activeCoin,
          amount: activeCoinQuantity,
          total: currentPrice * activeCoinQuantity,
          price: currentPrice,
          orderedDate: unixDate(),
        })
      } else {
        onPressButton({
          ...activeCoin,
          amount: activeCoinQuantity,
        })
      }
    }
  }

  const onRemoveCoin = (): void => {
    dispatch(removeCoinTrade(activeCoin?.id as string))
  }

  const onChangeAmount = (amount: string): void => {
    if (buttonLabel === 'Purchase' && !amount) {
      onRemoveCoin()
    } else {
      onAmountQuantityChange(undefined, amount ? parseInt(amount, 10) : 0)()
    }
  }

  const change24HStyles = StyleSheet.flatten([
    styles.coinChange,
    coin24hChg?.includes('-')
      ? styles.coin24HChgBearish
      : coin24hChg === '0.00'
      ? {}
      : styles.coin24HChgBullish,
  ])

  return (
    <View style={containerStyle}>
      <Text style={styles.coinName} numberOfLines={2}>
        {activeCoin?.name}
      </Text>
      <Text style={styles.coinSymbol}>
        {activeCoin?.symbol} / {activeCoin?.unit}
      </Text>
      <Text style={change24HStyles}>{coin24hChg}%</Text>
      <View style={styles.coinPriceContainer}>
        <Text style={styles.coinMetaLabel}>Market Price</Text>
        <View style={styles.coinQuantity}>
          <Text style={styles.coinPrice}>{currentPrice}</Text>
        </View>
      </View>
      <View style={styles.coinInputContainer}>
        <View style={styles.coinInput}>
          <Text style={styles.coinMetaLabel}>Amount</Text>
          <TextInput
            style={styles.coinInputBox}
            onChangeText={onChangeAmount}
            selectionColor="transparent"
            underlineColorAndroid="transparent"
            autoCorrect={false}
            autoFocus={false}
            keyboardType={'numeric'}
            defaultValue={activeCoinQuantity.toString()}
            onSubmitEditing={Keyboard.dismiss}
          />
          <View style={styles.coinQuantity}>
            <Text style={styles.coinPrice}>{activeCoinQuantity}</Text>
            <Text style={styles.coinUnit} numberOfLines={2}>
              {activeCoin?.symbol}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.coinPriceContainer}>
        <Text style={styles.coinMetaLabel}>Total</Text>
        <View style={styles.coinQuantity}>
          <Text style={styles.coinPrice}>
            {currentPrice * activeCoinQuantity}
          </Text>
          <Text style={styles.coinUnit} numberOfLines={2}>
            {activeCoin?.unit}
          </Text>
        </View>
      </View>
      <QuantityController
        onPress={onAmountQuantityChange}
        quantity={activeCoinQuantity}
        isQuantityVisible={false}
        containerStyle={styles.controllerContainer}
        controllerStyle={styles.controller}
        currentPrice={currentPrice}
      />
      <Button
        label={buttonLabel}
        buttonStyles={styles.tradesContainer}
        textStyles={styles.tradesLabel}
        onPress={onAddCoin}
        disabled={!activeCoinQuantity || !currentPrice}
      />
      {activeCoin?.amount && (
        <Button
          label="Remove"
          buttonStyles={styles.tradesRemoveContainer}
          textStyles={styles.tradesRemoveLabel}
          onPress={onRemoveCoin}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  coinName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme?.colors?.white,
    textDecorationColor: theme?.colors?.primary,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  coinSymbol: {
    fontSize: 12,
    color: theme?.colors?.white,
    textTransform: 'uppercase',
  },
  coinPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme?.colors?.troutOpacity30,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  coinQuantity: {
    flexDirection: 'row',
  },
  coinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coinInput: {
    position: 'relative',
    flex: 1,
    ...Platform.select({
      ios: {
        paddingVertical: 10,
        paddingHorizontal: 10,
      },
      android: {
        paddingVertical: 0,
        paddingHorizontal: 10,
      },
    }),
    borderRadius: 4,
    backgroundColor: theme?.colors?.troutOpacity30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinInputBox: {
    flex: 1,
    marginHorizontal: 8,
    ...Platform.select({
      android: {
        paddingVertical: 5,
      },
    }),
    color: 'transparent',
    fontSize: 12,
  },
  coinMetaLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme?.colors?.darkShadeLight60,
  },
  coinPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme?.colors?.white,
  },
  coinUnit: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme?.colors?.white,
    textTransform: 'uppercase',
    paddingLeft: 10,
  },
  coinChange: {
    fontSize: 12,
    color: theme?.colors?.darkShadeLight40,
    paddingBottom: 10,
  },
  coin24HChgBearish: {
    color: theme?.colors?.bearishRed,
  },
  coin24HChgBullish: {
    color: theme?.colors?.bullishGreen,
  },
  controllerContainer: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  controller: {
    width: '48%',
    borderRadius: 4,
  },
  tradesContainer: {
    backgroundColor: theme?.colors?.primary,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  tradesLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: theme?.colors?.white,
    textTransform: 'uppercase',
  },
  tradesRemoveContainer: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme?.colors?.bearishRed,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  tradesRemoveLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: theme?.colors?.bearishRed,
    textTransform: 'uppercase',
  },
})

export default memo(TradeCard)
