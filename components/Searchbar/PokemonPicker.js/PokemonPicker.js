import React, { useState } from 'react';
import { Picker, Text, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
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
      <Text style={styles.pokemonPickerTitle}>Sort by:</Text>
      <View style={styles.pokemonPicker}>
        <Picker
          onValueChange={value => handleOptionSelect(value)}
          selectedValue={selectedValue}
        >
          <Picker.Item label='Lowest to highest id' value='id asc' />
          <Picker.Item label='Highest to lowest id' value='id desc' />
          <Picker.Item label='A to Z' value='name asc' />
          <Picker.Item label='Z to A' value='name desc' />
        </Picker>
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
    borderColor: '#dadada'
  }
});
