import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducer/rootReducer';
import PokemonList from './components/PokemonList/PokemonList';

const middlewares = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Testern</Text>
        <PokemonList />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
