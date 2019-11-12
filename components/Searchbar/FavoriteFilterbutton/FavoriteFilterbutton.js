import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
export default function FavoriteFilterbutton() {
  return (
    <View>
      <TouchableOpacity
        style={
          false /*replace with 'clicked' when implemented*/
            ? styles.activeButton
            : styles.inactiveButton
        }
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
