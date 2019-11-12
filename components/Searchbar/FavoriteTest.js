import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { fetchFavorites } from '../../redux/ducks/favoritesDuck';

export default function FavoriteTest() {
  const dispatch = useDispatch();
  //const favorites = useSelector(state => state.favorites);
  return (
    <View>
      <TouchableOpacity
        style={styles.activeButton}
        onPress={() => dispatch(fetchFavorites())}
      >
        <Text style={styles.pokemonText}>Favorites</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  activeButton: {
    borderRadius: 3,
    width: 70,
    height: 30,
    margin: 5,
    padding: 6,
    backgroundColor: '#000'
  },
  inactiveButton: {
    borderRadius: 3,
    width: 70,
    height: 30,
    margin: 5,
    padding: 6
  },
  pokemonText: {
    color: 'white',
    textAlign: 'center'
  }
});
