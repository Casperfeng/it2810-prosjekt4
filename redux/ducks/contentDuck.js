// Actions
const SHOW_MORE_OPTIONS = 'SHOW_MORE_OPTIONS';
const SHOW_POKEMON_LIST = 'SHOW_POKEMON_LIST';

// Reducer
export default function contentReducer(state = false, action) {
  switch (action.type) {
    case SHOW_MORE_OPTIONS:
      return true;
    case SHOW_POKEMON_LIST:
      return false;
    default:
      return state;
  }
}

// Action creator
export function showMoreOptions() {
  return {
    type: SHOW_MORE_OPTIONS
  };
}

export function showPokemonList() {
  return {
    type: SHOW_POKEMON_LIST
  };
}
