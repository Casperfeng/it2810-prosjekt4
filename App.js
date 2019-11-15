import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducer/rootReducer';
import PokemonList from './components/PokemonList/PokemonList';
import Searchbar from './components/Searchbar/Searchbar';

const middlewares = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Pokédex</Text>
        <Searchbar />
        <View style={styles.pokemonListContainer}>
          <PokemonList />
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    flex: 1,
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto'
  },
  titleText: {
    fontSize: 36,
    textAlign: 'center'
  },
  pokemonListContainer: {
    flex: 1
  },
  searchbarContainer: {
    flex: 1
  }
});
