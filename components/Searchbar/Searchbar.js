import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateSearch } from '../../redux/ducks/searchDuck';
import { colorFromType } from '../../common/constants';
import Filterbutton from './Filterbutton/Filterbutton';

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
      </View>
      <View style={styles.pokemonDropdownContainer}>
        <Text>Dropdown</Text>
      </View>
      <Text style={styles.filterText}>Filter by:</Text>
      <View style={styles.filterbuttonContainer}>
        <Filterbutton value='poison' />
        <Filterbutton value='grass' />
        <Filterbutton value='fire' />
        <Filterbutton value='psychic' />
        <Filterbutton value='normal' />
        <Filterbutton value='fighting' />
        <Filterbutton value='electric' />
        <Filterbutton value='flying' />
        <Filterbutton value='bug' />
        <Filterbutton value='ground' />
        <Filterbutton value='ice' />
        <Filterbutton value='fairy' />
        <Filterbutton value='rock' />
        <Filterbutton value='dragon' />
        <Filterbutton value='water' />
        <Filterbutton value='steel' />
        <Filterbutton value='ghost' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchbarContentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10
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
    margin: 'auto',
    margin: 10,
    height: 45,
    width: '80%',
    borderWidth: 1,
    borderColor: '#dadada',
    fontSize: 16
  },

  pokemonDropdownContainer: {},

  filterText: {
    color: 'gray'
  },

  filterbuttonContainer: {
    width: '80%',
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});
