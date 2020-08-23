import React from 'react';
import { get, startCase } from 'lodash';
import styles from '../styles/PokemonDetails.module.css';
import { getPokemonDetails, getPokemonNames } from "../src/api/fetchers";

const Pokemon = ({ pokemon }) => {
  if (!pokemon) {
    return null;
  }

  const renderStats = (stats) => stats.map((stat) => (
    <span className={styles.statText}>
      <strong>{startCase(get(stat, 'stat.name', ''))}: </strong>
      {get(stat, 'base_stat', 0)}
    </span>
  ));

  const { sprite, name, stats } = pokemon;

  return (
    <div className={styles.container}>
      <div className={styles.detail}>
        <img src={sprite} alt={name} />
        <div className={styles.stats}>
          {renderStats(stats)}
        </div>
      </div>
    </div>
  )
};

const getPokemonPaths = async () => {
  const pokeApiResponse = await getPokemonNames();
  const pokemonList = get(pokeApiResponse, 'results', []);

  return pokemonList.map(({ name }) => ({ params: { pokemon: name } }))
};

const getPokemonInfo = async (pokemon) => {
  const details = await getPokemonDetails(pokemon);

  return {
    name: get(details, 'name', ''),
    sprite: get(details, 'sprites.front_default', ''),
    stats: get(details, 'stats', []),
  }
};

export async function getStaticProps({ params: { pokemon }}) {
  return {
    props: {
      pokemon: await getPokemonInfo(pokemon),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getPokemonPaths(),
    fallback: true,
  };
}

export default Pokemon;