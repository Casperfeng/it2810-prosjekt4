import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, TouchableOpacity, Image } from 'react-native';

export default function FavoriteButton(props) {
  const key = 'favorites';
  const favorite_icon_off = require('../../assets/favorite_icon_off.png');
  const favorite_icon_on = require('../../assets/favorite_icon_on.png');
  const [icon, setIcon] = useState('');

  // Make sure icon is correct at the beginning
  useEffect(() => {
    changeIcon();
  }, []);

  // Change the icon to the correct one
  async function changeIcon() {
    if (await isFavorited()) {
      setIcon(favorite_icon_on);
    } else {
      setIcon(favorite_icon_off);
    }
  }

  // Add pokemon to favorite
  async function addFavorite() {
    const favorites = await getFavorites();
    if (!favorites.includes(props.pokemonId)) {
      favorites.push(props.pokemonId);
      await _storeItem(favorites);
    }
    setIcon(favorite_icon_on);
  }

  // Get all of the mobile device's favorites
  async function getFavorites() {
    const favorites = await _retrieveItem();
    if (favorites !== null) {
      return favorites;
    } else {
      await _storeItem([]);
      return [];
    }
  }

  // Remove pokemon from favorites
  async function removeFavorite() {
    let favorites = await getFavorites();
    favorites = favorites.filter(el => el !== props.pokemonId);
    await _storeItem(favorites);
    setIcon(favorite_icon_off);
  }

  // Return whether or not pokemon is favorited
  async function isFavorited() {
    const favorites = await getFavorites();
    return favorites.includes(props.pokemonId);
  }

  // Remove/add pokemon to favorite when favorite button has been clicked
  async function onClick() {
    if (await isFavorited()) {
      await removeFavorite();
    } else {
      await addFavorite();
    }
    const favorites = await getFavorites();
    console.log(favorites);
  }

  /* AsyncStorage functions for storing, retrieving and removing item with favorites as key */

  _storeItem = async value => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log('Saving error.');
    }
  };

  _retrieveItem = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      const item = JSON.parse(value);
      return item;
    } catch (e) {
      console.log('Could not read value');
    }
  };

  _removeItem = async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log('Could not remove item.');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={onClick} style={{ width: 30, height: 30 }}>
        {icon != '' && (
          <Image style={{ width: 30, height: 30 }} source={icon} />
        )}
      </TouchableOpacity>
    </View>
  );
}
