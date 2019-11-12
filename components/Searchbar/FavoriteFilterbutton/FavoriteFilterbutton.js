import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { fetchFavorites } from '../../../redux/ducks/favoritesDuck';
import { AsyncStorage } from 'react-native';

export default function FavoriteFilterbutton() {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);

  // Retrieve favorites from AsyncStorage
  _retrieveFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('favorites');
      // Returns each favorited pokemon and -1 to make sure list is non-empty
      if (value === null) {
        setFavorites([-1]);
      } else {
        setFavorites([-1, ...JSON.parse(value)]);
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
    if (favorites.length !== 0) setFavorites([]);
    else _retrieveFavorites();
  }

  // Put favorites in redux
  useEffect(() => {
    dispatch(fetchFavorites(favorites));
  }, [favorites]);

  return (
    <View>
      <TouchableOpacity
        style={
          filterByFavorites() ? styles.activeButton : styles.inactiveButton
        }
        onPress={_onClick}
      >
        <Image
          source={require('../../../assets/favorite_background.png')}
        ></Image>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  activeButton: {
    width: 74,
    height: 34,
    margin: 2,
    borderRadius: 3,
    borderColor: 'red',
    borderWidth: 3,
    padding: 1,
    borderColor: 'rgb(1, 204, 143)',
    backgroundColor: 'gray'
  },
  inactiveButton: {
    borderRadius: 3,
    width: 70,
    height: 30,
    margin: 5,
    padding: 2,
    backgroundColor: '#9B9B9B'
  }
});
