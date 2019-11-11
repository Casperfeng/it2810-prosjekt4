import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { fireAction } from '../../../redux/ducks/sortDuck';

export default function PokemonPicker() {
  const dispatch = useDispatch();
  const [selectedValue, setValue] = useState('id asc');

  function handleOptionSelect(optionValue) {
    if (!optionValue) {
      return;
    }
    /**
     * Maps values to be treated in sortReducer
     */
    const optionArray = optionValue.split(' ');
    optionArray[1] = optionArray.includes('asc');
    dispatch(fireAction(optionArray[0], optionArray[1]));
    setValue(optionValue);
  }

  return (
    <View style={styles.pokemonPickerContainer}>
      <Text style={styles.pokemonPickerTitle}>Sort order:</Text>
      <View style={styles.pokemonPicker}>
        <RNPickerSelect
          onValueChange={value => handleOptionSelect(value)}
          selectedValue={selectedValue}
          items={[
            { label: 'Lowest to highest id', value: 'id asc' },
            { label: 'Highest to lowest id', value: 'id desc' },
            { label: 'A to Z', value: 'name asc' },
            { label: 'Z to A', value: 'name desc' }
          ]}
        />
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
    fontSize: 16,
    marginBottom: 20
  },
  pokemonPicker: {
    height: 'auto',
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    padding: 7,
    borderColor: '#dadada'
  }
});
