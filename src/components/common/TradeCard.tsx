import React, { memo, useEffect, useState } from 'react'
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
import { CoinTradeType } from '@customtypes/coins/coin'
import Button from './Button'
import QuantityController from './QuantityController'
import { useLazyFetchCoinDetailsQuery } from '@store/api/coinDetails'
import { POLLING_INTERVAL } from '@constants/config'
interface Props {
  buttonLabel: string
  onPressButton: (coinTrade: CoinTradeType) => void
  activeCoin?: CoinTradeType
  containerStyle?: StyleProp<ViewStyle>
}

const TradeCard: React.FC<Props> = (props) => {
  const { activeCoin, onPressButton, buttonLabel, containerStyle } = props
  const [activeCoinQuantity, setActiveCoinQuantity] = useState<number>(0)
  const [trigger, result] = useLazyFetchCoinDetailsQuery({
    pollingInterval: POLLING_INTERVAL,
    refetchOnFocus: true,
  })
  const isTradesScreen = !!activeCoin?.amount

  const currentPrice =
    result?.data && activeCoin
      ? result?.data?.[activeCoin?.id]?.[activeCoin?.unit]
      : 0

  useEffect(() => {
    if (activeCoin) {
      trigger({
        ids: activeCoin?.id,
        unit: activeCoin?.unit,
      })
    }
  }, [activeCoin, trigger])

  const onAmountQuantityChange =
    (isIncreasing?: boolean, amount?: number) => (): void => {
      if (amount) {
        setActiveCoinQuantity(amount)
      } else if (!amount && isIncreasing) {
        setActiveCoinQuantity((value) => value + 1)
      } else if (!isIncreasing) {
        setActiveCoinQuantity((value) => (activeCoinQuantity ? value - 1 : 0))
      }
    }

  const onChangeAmount = (amount: string): void => {
    onAmountQuantityChange(undefined, amount ? parseInt(amount, 10) : 0)()
  }

  const onAddCoin = (): void => {
    if (activeCoin && activeCoinQuantity) {
      onPressButton({
        ...activeCoin,
        amount: activeCoinQuantity,
      })
    }
  }

  return (
    <View style={containerStyle}>
      <Text style={styles.coinName} numberOfLines={2}>
        {activeCoin?.name}
      </Text>
      <Text style={styles.coinSymbol}>
        {activeCoin?.symbol} / {activeCoin?.unit}
      </Text>
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
      />
      <Button
        label={buttonLabel}
        buttonStyles={styles.tradesContainer}
        textStyles={styles.tradesLabel}
        onPress={onAddCoin}
        disabled={!activeCoinQuantity || !currentPrice}
      />
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
    paddingBottom: 10,
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
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginTop: 10,
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
})

export default memo(TradeCard)
