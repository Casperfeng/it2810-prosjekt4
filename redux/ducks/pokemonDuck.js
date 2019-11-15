import axios from 'axios';

// Actions
const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';

// Reducer
export default function pokemonReducer(state = [], action) {
  switch (action.type) {
    case FETCH_POKEMON_SUCCESS:
      const loadMore = action.payload.pop();
      if (loadMore) {
        return [...state, ...action.payload];
      }
      return [...action.payload];
    case FETCH_POKEMON_FAILURE:
      console.log(
        'Pokemon loading error, check if backend is connected properly'
      );
      return state;
    default:
      return state;
  }
}

// Action creators
export function fetchPokemonSuccess(response, loadMore) {
  response.data.push(loadMore);
  return {
    type: FETCH_POKEMON_SUCCESS,
    payload: response.data
  };
}

export function fetchPokemonFailure() {
  return {
    type: FETCH_POKEMON_FAILURE
  };
}

/**
 *
 * @param skip is the amount of results that should be skipped
 * @param types is an array of all types that should be included in the results
 * @param favorites is an array of all (favorite)pokemons that should be in the results
 * @param search is an string that specify what each result must include in its name
 * @param sortParam specifies how each pokemon is sortet and therefore how they should be fetched
 * @param {*} asc is true for ascending order, false for descending order
 * @param {*} loadMore is true if fetchPokemon is called by scrolling to the bottom, else it is false
 */
export function fetchPokemon(
  skip = 0,
  types = [],
  favorites = [],
  search = '',
  sortParam = '',
  asc = true,
  loadMore = false
) {
  const searchString = search ? `&name=${search}` : '';
  const sortString = sortParam ? `&sort=${sortParam}` : '';
  const orderString = asc ? '' : 'DESC';
  const typesString = types ? `&types=${JSON.stringify(types)}` : '[]';
  const idListString = favorites
    ? `&idList=${JSON.stringify(favorites)}`
    : '[]';
  return dispatch =>
    axios
      .get(
        `http://it2810-03.idi.ntnu.no:8080/api/v2/pokemon/?skip=${skip +
          typesString +
          idListString +
          searchString +
          sortString +
          orderString}`
      )
      .then(response => dispatch(fetchPokemonSuccess(response, loadMore)))
      .catch(err => dispatch(fetchPokemonFailure(err)));
}
