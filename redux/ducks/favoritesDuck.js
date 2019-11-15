// Actions
const FETCH_FAVORITES = 'FETCH_FAVORITES';
const UPDATE_FAVORITES = 'UPDATE_FAVORITES';

// Reducer
export default function favoritesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_FAVORITES:
      return [...action.payload];
    case UPDATE_FAVORITES:
      if (state.includes(action.payload))
        return state.filter(value => value !== action.payload);
      return [...state, action.payload];
    default:
      return state;
  }
}

// Action creators
export function fetchFavorites(favorites) {
  return {
    type: FETCH_FAVORITES,
    payload: favorites
  };
}

export function updateFavorites(pokemonID) {
  return dispatch => {
    dispatch({ type: UPDATE_FAVORITES, payload: pokemonID });
  };
}
