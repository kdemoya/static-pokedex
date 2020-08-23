import fetch from 'isomorphic-fetch';
import API from './constants'

const { BASE_ENDPOINT, POKEMON_DETAILS_ENDPOINT, LIMIT } = API;

export const fetcher = (url) => fetch(url).then((response) => response.json());
export const getPokemonNames = () => fetcher(`${BASE_ENDPOINT}${POKEMON_DETAILS_ENDPOINT}?limit=${LIMIT}`);
export const getPokemonDetails = (name) => fetcher(`${BASE_ENDPOINT}${POKEMON_DETAILS_ENDPOINT}/${name}`);
