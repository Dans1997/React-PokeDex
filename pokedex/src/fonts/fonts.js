import { createGlobalStyle } from 'styled-components';

import PokemonClassic from './PokemonClassic.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'PokemonClassic';
        src: local('Pokemon Classic'), local('PokemonClassic'),
        url(${PokemonClassic}) format('ttf'),
        font-weight: 300;
        font-style: normal;
    }
`;