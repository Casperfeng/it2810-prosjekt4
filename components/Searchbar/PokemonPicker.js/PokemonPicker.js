import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fireAction } from '../../../redux/ducks/sortDuck';
import RNPickerSelect from 'react-native-picker-select';

export default function PokemonPicker() {
  const dispatch = useDispatch();
  const sortInfo = useSelector(state => state.sortInfo);

  /* Updates the redux when selected value changes*/
  function handleOptionSelect(optionValue) {
    if (!optionValue) {
      return;
    }
    //Maps values to be treated in sortReducer
    const optionArray = optionValue.split(' ');
    optionArray[1] = optionArray.includes('asc');
    dispatch(fireAction(optionArray[0], optionArray[1]));
  }

  return (
    <View style={styles.pokemonPickerContainer}>
      <Text style={styles.pokemonPickerTitle}>Sort by:</Text>
      <View style={styles.pokemonPicker}>
        <View style={styles.pokemonPicker}>
          <RNPickerSelect
            style={{
              inputIOS: {
                padding: 20
              }
            }}
            onValueChange={value => handleOptionSelect(value)}
            value={
              sortInfo.sortBy + ' ' + (sortInfo.ascending ? 'asc' : 'desc')
            }
            placeholder={{}}
            items={[
              { label: 'Lowest to highest id', value: 'id asc' },
              { label: 'Highest to lowest id', value: 'id desc' },
              { label: 'A to Z', value: 'name asc' },
              { label: 'Z to A', value: 'name desc' }
            ]}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  pokemonPickerContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  pokemonPickerTitle: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 5,
    marginTop: 15
  },
  pokemonPicker: {
    height: 'auto',
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#dadada'
  }
});
