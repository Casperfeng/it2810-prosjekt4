import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { openModal } from '../../../redux/ducks/modalDuck';
import { colorFromType } from '../../../common/constants';

export default function Pokemon(props) {
  const dispatch = useDispatch();

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

  return (
    <TouchableHighlight onPress={_onPressListItem}>
      <LinearGradient
        colors={props.types.map(color => colorFromType[color])}
        locations={props.types.length === 1 ? [1] : [0.15, 1.0]}
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
      </LinearGradient>
    </TouchableHighlight>
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
    marginLeft: 30,
    marginTop: 16,
    fontSize: 22,
    color: 'white'
  },
  pokemonDescription: {
    color: 'white',
    width: '100%',
    marginLeft: 30,
    fontSize: 18,
    fontStyle: 'italic'
  },
  pokemonPhoto: {
    height: 100,
    width: 100
  }
});
