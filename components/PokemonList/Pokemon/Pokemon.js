import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { openModal } from '../../../redux/ducks/modalDuck';
import { colorFromType } from '../../../common/constants';
import FavoriteButton from '../../FavoriteButton/FavoriteButton';

export default function Pokemon(props) {
  const dispatch = useDispatch();

  /* Opens the clicked pokemon's modal */
  function _onPressListItem() {
    dispatch(
      openModal({
        id: props.id,
        stats: props.stats,
        name: props.name,
        types: props.types
      })
    );
  }

  /*
   * Return a color for each type for LinearGradient.
   * If there are only one type, then return that color twice.
   */
  function gradientColors() {
    const color1 = colorFromType[props.types[0]];
    const color2 = colorFromType[props.types[props.types.length - 1]];
    return [color1, color2];
  }

  return (
    <TouchableOpacity onPress={_onPressListItem}>
      <LinearGradient
        colors={gradientColors()}
        locations={[0.15, 1.0]}
        style={styles.pokemonContainer}
      >
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`
          }}
          style={styles.pokemonPhoto}
        />
        <View style={styles.pokemonTextContainer}>
          <Text style={styles.title}>{props.name}</Text>
          <Text style={styles.pokemonDescription}>{`#${props.id}`}</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: -5,
            left: -5
          }}
        >
          <FavoriteButton pokemonId={props.id} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pokemonContainer: {
    width: 300,
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 5,
    elevation: 2
  },

  title: {
    marginLeft: 20,
    marginTop: 26,
    fontSize: 22,
    color: 'white',
    textTransform: 'capitalize'
  },
  pokemonDescription: {
    color: 'white',
    width: '100%',
    marginLeft: 20,
    fontSize: 18,
    fontStyle: 'italic'
  },
  pokemonPhoto: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 0,
    height: 100,
    width: 100
  }
});
