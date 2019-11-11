import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AuthSession } from 'expo';
function PokemonStats(props) {
  function getStats(name, index) {
    return (
      <View style={styles.statContainer}>
        <Text style={styles.pokemonStatHeaderText}>{name}</Text>
        <View style={styles.progressBarBody}>
          <View
            style={{
              ...styles.progressBar,
              width: (100 * Math.min(props.stats[index], 150)) / 150 + '%'
            }}
          >
            <Text style={styles.pokemonStatText}>{props.stats[index]}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.statsContainer}>
      {getStats('HP', 0)}
      {getStats('Attack', 1)}
      {getStats('Defence', 2)}
      {getStats('Sp. Atk', 3)}
      {getStats('Sp. Def', 4)}
      {getStats('Speed', 5)}
    </View>
  );
}
const styles = StyleSheet.create({
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    padding: 20
  },
  statContainer: {},
  pokemonStatHeaderText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  },
  pokemonStatText: {
    fontSize: 14,
    fontWeight: '500',
    margin: 'auto',
    color: 'white',
    textAlign: 'center'
  },
  progressBarBody: {
    borderRadius: 2,
    width: '100%',
    height: 20,
    backgroundColor: 'white'
  },
  progressBar: {
    borderRadius: 2,
    height: 20,
    backgroundColor: '#2ecc71'
  }
});
export default PokemonStats;
