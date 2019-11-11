import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateSearch } from '../../redux/ducks/searchDuck';

export default function Searchbar() {
  const dispatch = useDispatch();
  /**
   * Brukes for å unngå unødvendige kall til backenden
   */
  const delayedQuery = _.debounce(q => dispatch(updateSearch(q)), 500);
  return (
    <View style={styles.searchbarContentContainer}>
      <View style={styles.searchbar}>
        <TextInput
          style={styles.searchbarInput}
          placeholder='Search for pokemon . . .'
          onChangeText={text => delayedQuery(text)}
        />
        <View style={styles.pokemonDropdownContainer}>
          <Text>Dropdown</Text>
        </View>
      </View>
      <Text style={styles.filterText}>Filter by:</Text>
      <View style={styles.filterbuttonContainer}>
        <Text>Buttons</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchbarContentContainer: {
    marginBottom: 30
  },

  searchbar: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 5
  },

  searchbarInput: {
    display: 'flex',
    borderRadius: 30,
    padding: 10,
    margin: 10,
    height: 45,
    width: 250,
    borderWidth: 1,
    borderColor: '#dadada',
    fontSize: 16
  },

  pokemonDropdownContainer: {},

  filterText: {
    color: 'gray'
  },

  filterbuttonContainer: {
    margin: 'auto',
    width: '60%',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center'
  }
});
