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
 * @param skip er antall resultater i søket som skal hoppes over
 * @param types er en array av alle typene som skal bli inkludert i resultatet
 * @param favorites er en array av alle (favoritt)pokemoner som skal være med i resultatet
 * @param search er en streng som spesifiserer hva navn til resulterende pokemon skal inneholde
 * @param sortParam spesifiserer hvordan pokemonene er sortert og derfor hvordan de hentes
 * @param {*} asc er true for stigende rekkefølge, false for synkende
 * @param {*} loadMore er true hvis fetchPokemon kalles fra <Loadingbutton/>, false ellers
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
