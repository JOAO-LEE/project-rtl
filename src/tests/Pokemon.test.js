import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('6. Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ pokemons[0] }
      />,
    );
    const pikachuImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImage).toBeInTheDocument();
    const pikachuSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
    expect(pikachuImage).toHaveAttribute('src', pikachuSprite);
    expect(pikachuImage).toHaveAttribute('alt', 'Pikachu sprite');

    const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pikachuWeight).toBeInTheDocument();

    const pikachuName = screen.getByText(/pikachu/i);
    expect(pikachuName).toBeInTheDocument();

    const pikachuType = screen.getByText(/electric/i);
    expect(pikachuType).toBeInTheDocument();
  });
  test(`Teste se o card do pokémon indicado na Pokédex 
  contém um link de navegação para exibir detalhes deste pokémon. 
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido`, () => {
    renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ pokemons[0] }
      />,
    );
    const pikachuDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(pikachuDetailsLink).toBeInTheDocument();
    expect(pikachuDetailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  test(`Teste se ao clicar no link de navegação do pokémon,
  é feito o redirecionamento da aplicação para a página de detalhes de pokémon`, () => {
    const { history } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ pokemons[0] }
      />,
    );
    const pikachuDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pikachuDetailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ pokemons[0] }
      />,
    );
    const favoriteStar = screen.getByRole('img',
      { name: /pikachu is marked as favorite/i });
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
