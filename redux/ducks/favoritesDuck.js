import { AsyncStorage } from 'react-native';

// Actions
const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
const FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE';

// Reducer
export default function favoritesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_FAVORITES_SUCCESS:
      if (action.payload.length === 0) return [-1]; // Get no pokemon
      return [...action.payload];
    case FETCH_FAVORITES_FAILURE:
      console.log('AsyncStorage error. Could not retrieve favorite pokemon.');
      return state;
    default:
      return state;
  }
}

// Action creators
export function fetchFavoritesSuccess(response) {
  return {
    type: FETCH_FAVORITES_SUCCESS,
    payload: response.data
  };
}

export function fetchFavoritesFailure() {
  return {
    type: FETCH_FAVORITES_FAILURE
  };
}

export function fetchFavorites() {
  return _retrieveFavorites();
}

_retrieveFavorites = async () => {
  async dispatch => {
    try {
      const value = await AsyncStorage.getItem('favorites');
      const favorites = JSON.parse(value);
      if (value === null) {
        favorites = [];
      }
      return dispatch(fetchFavoritesSuccess(favorites));
    } catch (e) {
      return dispatch(fetchFavoritesFailure(e));
    }
  };
};
