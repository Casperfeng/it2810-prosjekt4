import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { fetchFavorites } from '../../../redux/ducks/favoritesDuck';
import { AsyncStorage } from 'react-native';

export default function FavoriteFilterbutton() {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);

  // Retrieve favorites from AsyncStorage
  _retrieveFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('favorites');
      // Returns each favorited pokemon and -1 to make sure list is non-empty
      if (value === null) {
        dispatch(fetchFavorites([-1]));
      } else {
        dispatch(fetchFavorites([-1, ...JSON.parse(value)]));
      }
    } catch (e) {
      console.log('Could not retrieve favorites from AsyncStorage.');
    }
  };

  // Returns whether or not to filter by favorites
  filterByFavorites = () => {
    return favorites.length !== 0;
  };

  // Filter by favorites on click
  async function _onClick() {
    if (favorites.length !== 0) dispatch(fetchFavorites([]));
    else _retrieveFavorites();
  }

  return (
    <View>
      <TouchableOpacity
        style={
          filterByFavorites() ? styles.activeButton : styles.inactiveButton
        }
        onPress={_onClick}
      >
        <Image
          style={styles.image}
          source={require('../../../assets/favorite_background.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  activeButton: {
    width: 70,
    height: 30,
    margin: 5,
    padding: 3,
    paddingBottom: 0,
    backgroundColor: 'gray',
    borderRadius: 3,
    borderWidth: 0,
    borderColor: 'rgb(1, 204, 143)',
    borderBottomWidth: 3
  },
  inactiveButton: {
    width: 70,
    height: 30,
    margin: 5,
    borderRadius: 3,
    borderWidth: 3,
    borderColor: 'gray'
  },
  image: {
    width: 64,
    height: 24
  }
});
