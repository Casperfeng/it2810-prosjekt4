// Actions
const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
const FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE';
const UPDATE_FAVORITES = 'UPDATE_FAVORITES';

// Reducer
export default function favoritesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_FAVORITES_SUCCESS:
      return [...action.payload];
    case FETCH_FAVORITES_FAILURE:
      console.log('AsyncStorage error. Could not retrieve favorite pokemon.');
      return state;
    case UPDATE_FAVORITES:
      if (state.includes(action.payload))
        return state.filter(value => value !== action.payload);
      return [...state, action.payload];
    default:
      return state;
  }
}

// Action creators
export function fetchFavoritesSuccess(response) {
  return {
    type: FETCH_FAVORITES_SUCCESS,
    payload: response
  };
}

export function fetchFavoritesFailure() {
  return {
    type: FETCH_FAVORITES_FAILURE
  };
}

export function fetchFavorites(favorites) {
  return dispatch => {
    dispatch(fetchFavoritesSuccess(favorites));
  };
}

export function updateFavorites(pokemonID) {
  return dispatch => {
    dispatch({ type: UPDATE_FAVORITES, payload: pokemonID });
  };
}
