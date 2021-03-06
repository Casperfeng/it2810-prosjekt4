import { combineReducers } from 'redux';
import pokemonDuck from '../ducks/pokemonDuck';
import typesDuck from '../ducks/typesDuck';
import searchReducer from '../ducks/searchDuck';
import modalReducer from '../ducks/modalDuck';
import contentDuck from '../ducks/contentDuck';
import sortDuck from '../ducks/sortDuck';
import favoritesDuck from '../ducks/favoritesDuck';

// Using the ducks module pattern for Redux

const rootReducer = combineReducers({
  pokemon: pokemonDuck,
  types: typesDuck,
  favorites: favoritesDuck,
  search: searchReducer,
  modalInfo: modalReducer,
  moreOptions: contentDuck,
  sortInfo: sortDuck
});

export default rootReducer;
