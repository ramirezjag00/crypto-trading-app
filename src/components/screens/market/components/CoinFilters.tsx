import React, { Fragment, useState } from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

import theme from '@theme'
import { mainFilters } from '@constants/coinFilters'
import { CoinFiltersType, CoinUnitsType } from '@customtypes/coins/coin'
import { isCoinFilter } from '@utils/coins'

const SCREEN_WIDTH = Dimensions.get('screen')?.width

interface Props {
  activeUnit: string
  setActiveUnit: React.Dispatch<React.SetStateAction<string>>
  coinUnits: CoinUnitsType
}

const CoinFilters: React.FC<Props> = (props) => {
  const { activeUnit, setActiveUnit, coinUnits } = props
  const [activeMainFilter, setActiveMainFilter] = useState<CoinFiltersType>(
    CoinFiltersType?.BTC,
  )

  const subFilters =
    activeMainFilter === CoinFiltersType?.BTC
      ? []
      : coinUnits?.[activeMainFilter]

  const onFilterPress = (filter: CoinFiltersType | string) => () => {
    if (!isCoinFilter(filter) || filter === CoinFiltersType?.BTC) {
      setActiveUnit(filter)
    }

    if (isCoinFilter(filter)) {
      setActiveMainFilter(filter as CoinFiltersType)
    }
  }

  const renderFilterItem = ({ item }: { item: CoinFiltersType | string }) => {
    const buttonStyles = StyleSheet.flatten([
      isCoinFilter(item) ? styles.filterContainer : styles.subFilterContainer,
      item === activeUnit && item !== CoinFiltersType?.BTC
        ? styles.activeFilterContainer
        : {},
      item === activeMainFilter ? styles.activeMainFilter : {},
    ])

    return (
      <TouchableOpacity style={buttonStyles} onPress={onFilterPress(item)}>
        <Text style={styles.filterLabel}>{item}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <Fragment>
      <FlatList
        data={mainFilters}
        renderItem={renderFilterItem}
        keyExtractor={(item: string, index: number) => `${item}-${index}`}
        style={styles.filtersContainer}
        contentContainerStyle={styles.mainFiltersContentContainer}
        horizontal
        scrollEnabled={false}
      />
      <FlatList
        data={subFilters}
        renderItem={renderFilterItem}
        keyExtractor={(item: string, index: number) => `${item}-${index}`}
        style={styles.filtersContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  filtersContainer: {
    flexGrow: 0,
  },
  mainFiltersContentContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  subsFiltersContentContainer: {
    flex: 1,
  },
  filterContainer: {
    padding: SCREEN_WIDTH * 0.05,
    paddingVertical: 10,
    marginTop: 15,
  },
  activeMainFilter: {
    borderBottomColor: theme?.colors?.primary,
    borderBottomWidth: 2,
  },
  subFilterContainer: {
    marginHorizontal: 10,
    padding: SCREEN_WIDTH * 0.05,
    paddingVertical: 5,
    marginTop: 15,
    backgroundColor: theme?.colors?.darkShadeLight20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeFilterContainer: {
    backgroundColor: theme?.colors?.primary,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme?.colors?.white,
    textTransform: 'uppercase',
  },
})

export default CoinFilters
