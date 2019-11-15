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
import { useSelector, useDispatch } from 'react-redux';
import { updateSearch } from '../../redux/ducks/searchDuck';
import FavoriteFilterbutton from './FavoriteFilterbutton/FavoriteFilterbutton';
import TypeFilterbutton from './TypeFilterbutton/TypeFilterbutton';
import PokemonPicker from './PokemonPicker.js/PokemonPicker';
import {
  showPokemonList,
  showMoreOptions
} from '../../redux/ducks/contentDuck';

export default function Searchbar() {
  const dispatch = useDispatch();
  /**
   * Brukes for å unngå unødvendige kall til backenden
   */
  const delayedQuery = _.debounce(q => dispatch(updateSearch(q)), 500);

  const moreOptions = useSelector(state => state.moreOptions);
  function moreOptionsView() {
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
          if (moreOptions) {
            dispatch(showPokemonList());
          } else {
            dispatch(showMoreOptions());
          }
        }}
      >
        <View style={styles.moreOptionsContainer}>
          <Text style={styles.moreOptionsTitle}>More Options</Text>
          <Image
            style={styles.moreOptionsIcon}
            source={
              moreOptions
                ? require('../../assets/arrow_up.png')
                : require('../../assets/arrow_down.png')
            }
          />
        </View>
      </TouchableOpacity>

      {moreOptions && moreOptionsView()}
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
    borderWidth: 1,
    borderColor: '#dadada',
    fontSize: 16,
    width: 200
  },

  filterText: {
    fontSize: 12,
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
  },

  moreOptionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 'auto'
  },
  moreOptionsIcon: {
    width: 35,
    height: 35,
    alignSelf: 'center'
  },
  moreOptionsTitle: {
    fontSize: 12,
    color: 'gray'
  }
});
