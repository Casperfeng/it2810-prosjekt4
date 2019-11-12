import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import { fetchPokemon } from '../../redux/ducks/pokemonDuck';
import Pokemon from './Pokemon/Pokemon';

export default function PokemonList() {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);
  const types = useSelector(state => state.types);
  const favorites = useSelector(state => state.favorites);
  const search = useSelector(state => state.search);
  const sortInfo = useSelector(state => state.sortInfo);

  useEffect(() => {
    dispatch(
      fetchPokemon(
        0,
        types,
        favorites,
        search,
        sortInfo.sortBy,
        sortInfo.ascending
      )
    );
    // eslint-disable-next-line
  }, [types, search, sortInfo]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={pokemon}
      renderItem={({ item }) => (
        <Pokemon
          id={item.id}
          stats={item.stats}
          name={item.name}
          types={item.types}
          views={item.views}
        />
      )}
      keyExtractor={item => item._id}
      //Fetches new pokemon dynamically by scrolling
      onEndReached={() =>
        dispatch(
          fetchPokemon(
            pokemon.length,
            types,
            favorites,
            search,
            sortInfo.sortBy,
            sortInfo.ascending,
            true
          )
        )
      }
    />
  );
}
