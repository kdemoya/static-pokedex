import React from "react";
import styles from '../styles/Home.module.css'
import { fetcher, getPokemonNames } from "../src/api/fetchers";
import { get } from "lodash";
import PokemonCard from "../src/components/PokemonCard";

const renderPokemonList = (list) => {
  return list.map(({ name, sprite }) => <PokemonCard name={name} sprite={sprite} />);
};

export default function PokemonList({ pokemonList }) {
  return (
    <div className={styles.container}>
      {renderPokemonList(pokemonList)}
    </div>
  )
}

const getPokemonList = async () => {
  const pokeApiResponse = await getPokemonNames();
  const pokemonList = get(pokeApiResponse, 'results', []);

  return Promise.all(
    pokemonList.map(async ({ name, url }) => {
      const pokemonDetails = await fetcher(url);
      return { name, sprite: get(pokemonDetails, 'sprites.front_default', 'not found')}
    }
  ));
};

export async function getStaticProps() {
  return {
    props: {
      pokemonList: await getPokemonList(),
      revalidate: 60*60*24,
    },
  }
}
