import React from 'react';
import { capitalize } from 'lodash';
import styles from '../../styles/PokemonCard.module.css'

const PokemonCard = ({ name, sprite }) => {
  return (
    <a href={`/${name}`}>
      <div className={styles.card}>
        <span>{capitalize(name)}</span>
        <img src={sprite} alt={name} />
      </div>
    </a>
  )
}

export default PokemonCard
