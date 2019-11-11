import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { updateType } from '../../../redux/ducks/typesDuck';
import { colorFromType } from '../../../common/constants';

export default function Filterbutton(props) {
  const dispatch = useDispatch();
  const types = useSelector(state => state.types);
  const clicked = types.includes(props.value);
  const typeColor = colorFromType[props.value];
  return (
    <View>
      <TouchableHighlight
        style={
          clicked
            ? { backgroundColor: typeColor, ...styles.activeButton }
            : { backgroundColor: typeColor, ...styles.inactiveButton }
        }
        onPress={() => dispatch(updateType(props.value))}
      >
        <Text style={styles.pokemonText}>{props.value}</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  activeButton: {
    margin: 2,
    borderRadius: 3,
    borderColor: 'red',
    borderWidth: 3,
    padding: 10,
    borderColor: 'rgb(1, 204, 143)'
  },
  inactiveButton: {
    margin: 5,
    padding: 10
  },
  pokemonText: {
    color: 'white'
  }
});
