import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { updateType } from '../../../redux/ducks/typesDuck';
import { colorFromType } from '../../../common/constants';

export default function TypeFilterbutton(props) {
  const dispatch = useDispatch();
  const types = useSelector(state => state.types);
  const clicked = types.includes(props.value);
  const typeColor = colorFromType[props.value];
  return (
    <View>
      <TouchableOpacity
        style={
          clicked
            ? { backgroundColor: typeColor, ...styles.activeButton }
            : { backgroundColor: typeColor, ...styles.inactiveButton }
        }
        onPress={() => dispatch(updateType(props.value))}
      >
        <Text style={styles.pokemonText}>{props.value}</Text>
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
    borderWidth: 3,
    padding: 6,
    borderColor: 'rgb(1, 204, 143)'
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
