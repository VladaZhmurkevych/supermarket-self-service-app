import {
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { $gray } from '../constants/Colors';
import { formatPrice } from '../utils/helpers';
import SmallLoader from './SmallLoader';

export default function Counter({
  displayCounter,
  quantity,
  isLoading,
  changeQuantity,
  displayPrices,
  price,
  sum,
  counterStyles,
}) {
  const [localQuantity, setLocalQuantity] = useState('1');

  useEffect(() => {
    updateLocalQuantity(quantity);
  }, [quantity]);

  const increment = useCallback(() => {
    changeQuantity(quantity + 1);
    updateLocalQuantity(quantity + 1);
  }, [quantity, changeQuantity]);

  const decrement = useCallback(() => {
    changeQuantity(quantity - 1);
    updateLocalQuantity(quantity - 1);
  }, [quantity, changeQuantity]);

  const customQuantityChange = useCallback(() => {
    const parsedQuantity = parseFloat(localQuantity);
    changeQuantity(parsedQuantity);
  }, [changeQuantity, localQuantity]);

  const updateLocalQuantity = useCallback(
    (newQuantity) => {
      const parsedQuantity = +newQuantity;
      if (isNaN(parsedQuantity)) {
        return;
      }
      setLocalQuantity(String(newQuantity));
    },
    [setLocalQuantity],
  );

  return (
    <View style={[styles.amountContainer, counterStyles]}>
      {displayPrices && <Text style={styles.priceText}>{formatPrice(price)}</Text>}
      {!displayCounter ? (
        <Text style={styles.priceText}>{quantity}</Text>
      ) : (
        <View style={styles.counter}>
          <TouchableOpacity onPress={decrement} disabled={isLoading}>
            <Ionicons name="ios-remove-circle-outline" size={30} color={$gray} />
          </TouchableOpacity>
          <View style={styles.counterContainer}>
            <SmallLoader isVisible={isLoading} />
            {!isLoading && (
              <TextInput
                keyboardType="decimal-pad"
                value={localQuantity}
                onChangeText={updateLocalQuantity}
                onEndEditing={customQuantityChange}
                style={styles.counterInput}
              />
            )}
          </View>

          <TouchableOpacity onPress={increment} disabled={isLoading}>
            <Icon name="plus" color={$gray} size={25} />
          </TouchableOpacity>
        </View>
      )}

      {displayPrices && <Text style={styles.priceText}>{formatPrice(sum)}</Text>}
    </View>
  );
}

Counter.defaultProps = {
  changeQuantity: () => {},
  price: null,
  counterStyles: {},
  sum: null,
};

Counter.propTypes = {
  displayCounter: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  changeQuantity: PropTypes.func,
  displayPrices: PropTypes.bool.isRequired,
  price: PropTypes.number,
  sum: PropTypes.number,
  counterStyles: PropTypes.shape({}),
};

const styles = StyleSheet.create({
  amountContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
  },
  counterContainer: {
    width: 50,
    marginLeft: 10,
    marginRight: 10,
    position: 'relative',
    height: '100%',
  },
  counterInput: {
    borderWidth: 1,
    padding: 5,
    borderColor: $gray,
    borderRadius: 10,
    width: 50,
    textAlign: 'center',
  },
});
