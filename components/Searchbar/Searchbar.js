import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';
import { updateSearch } from '../../redux/ducks/searchDuck';
import FavoriteFilterbutton from './FavoriteFilterbutton/FavoriteFilterbutton';
import TypeFilterbutton from './TypeFilterbutton/TypeFilterbutton';
import PokemonPicker from './PokemonPicker.js/PokemonPicker';

export default function Searchbar() {
  const dispatch = useDispatch();
  /**
   * Brukes for å unngå unødvendige kall til backenden
   */
  const delayedQuery = _.debounce(q => dispatch(updateSearch(q)), 500);

  const [show, setShow] = useState(false);
  function moreOptions() {
    return (
      <>
        <View style={styles.pokemonDropdownContainer}>
          <PokemonPicker />
        </View>
        <Text style={styles.filterText}>Filter by:</Text>
        <View style={styles.filterbuttonContainer}>
          <FavoriteFilterbutton />
          <TypeFilterbutton value='poison' />
          <TypeFilterbutton value='grass' />
          <TypeFilterbutton value='fire' />
          <TypeFilterbutton value='psychic' />
          <TypeFilterbutton value='normal' />
          <TypeFilterbutton value='fighting' />
          <TypeFilterbutton value='electric' />
          <TypeFilterbutton value='flying' />
          <TypeFilterbutton value='bug' />
          <TypeFilterbutton value='ground' />
          <TypeFilterbutton value='ice' />
          <TypeFilterbutton value='fairy' />
          <TypeFilterbutton value='rock' />
          <TypeFilterbutton value='dragon' />
          <TypeFilterbutton value='water' />
          <TypeFilterbutton value='steel' />
          <TypeFilterbutton value='ghost' />
        </View>
      </>
    );
  }
  return (
    <View style={styles.searchbarContentContainer}>
      <View style={styles.searchbar}>
        <TextInput
          style={styles.searchbarInput}
          placeholder='Search for pokemon . . .'
          onChangeText={text => delayedQuery(text)}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          setShow(!show);
        }}
      >
        <Image
          style={{ width: 20, height: 20, marginBottom: 5 }}
          source={
            show
              ? require('../../assets/arrow_up.png')
              : require('../../assets/arrow_down.png')
          }
        />
      </TouchableOpacity>
      {show && moreOptions()}
    </View>
  );
}

const styles = StyleSheet.create({
  searchbarContentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 5
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
    width: '100%',
    borderWidth: 1,
    borderColor: '#dadada',
    fontSize: 16
  },

  filterText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20
  },

  filterbuttonContainer: {
    width: '80%',
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  pokemonDropdownContainer: {
    width: '60%'
  }
});
