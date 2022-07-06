import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import pokemons from '../data';

const favoritedPokemons = {
  25: true,
  4: false,
  10: true,
};

const allPokemons = [
  'Pikachu', 'Charmander', 'Caterpie', 'Ekans',
  'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair',
];

const pokemonFilters = ['Electric', 'Fire', 'Bug',
  'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('5. Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ favoritedPokemons }
        />
      </MemoryRouter>,
    );
  });
  test('Se a página contém um  h2 com o texto "Encountered pokémons"', () => {
    const headingText = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(headingText).toBeInTheDocument();
  });

  test('O botão deve conter o texto "Próximo pokémon"', () => {
    const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokeBtn).toBeInTheDocument();
    expect(nextPokeBtn).toHaveAttribute('type', 'button');
  });

  test('Os pokemons devem ser mostrados sequencialmente na ação de click',
    () => {
      const pikachuImage = screen.getByRole('img', { name: /pikachu sprite/i });
      expect(pikachuImage).toBeInTheDocument();

      const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(nextPokeBtn).toBeInTheDocument();

      allPokemons.forEach((character) => {
        expect(screen.queryByText(character)).toBeInTheDocument();
        userEvent.click(nextPokeBtn);
      });
    });

  test('Se é exibido o próximo pokémon quando o botão "Próximo pokémon" é clicado',
    () => {
      const pikachuImage = screen.getByRole('img', { name: /pikachu sprite/i });
      const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(pikachuImage).toBeInTheDocument();
      userEvent.click(nextPokeBtn);
    });

  test('Teste se é mostrado apenas um pokémon por vez',
    () => {
      const pikachuImage = screen.getByRole('img', { name: /pikachu sprite/i });
      expect(pikachuImage).toBeInTheDocument();

      const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(nextPokeBtn);

      const charmanderImage = screen.getByRole('img', { name: /charmander sprite/i });
      const charmanderName = screen.getByText(/charmander/i);
      const charmanderWeight = screen.getByText(/average weight: 8\.5 kg/i);
      expect(charmanderImage).toBeInTheDocument();
      expect(charmanderName).toBeInTheDocument();
      expect(charmanderWeight).toBeInTheDocument();

      const pikachuName = screen.queryByText(/pikachu/i);
      const pikachuNotTo = screen.queryByText('img', { name: /pikachu sprite/i });
      expect(pikachuName).not.toBeInTheDocument();
      expect(pikachuNotTo).not.toBeInTheDocument();
    });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    pokemonFilters.forEach((filters) => {
      expect(screen.getByRole('button', { name: `${filters}` })).toBeInTheDocument();
    });

    const allPokemonsButton = screen.getByRole('button', { name: /all/i });
    expect(allPokemonsButton).toBeInTheDocument();

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    typeButtons.forEach((types) => {
      expect(types).toHaveAttribute('type', 'button', 'pokemon-type-button');
      expect(types).toBeInTheDocument();
    });

    const ekansImage = screen.getByRole('img', { name: /pikachu sprite/i });
    const poisonTypeButton = screen.getByRole('button', { name: /poison/i });
    const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(poisonTypeButton);
    expect(allPokemonsButton).toBeInTheDocument();
    expect(ekansImage).toBeInTheDocument();

    const pikachuNotTo = screen.queryByText('img', { name: /pikachu sprite/i });
    expect(pikachuNotTo).not.toBeInTheDocument();

    const psychicTypeButton = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(psychicTypeButton);
    expect(allPokemonsButton).toBeInTheDocument();
    expect(pikachuNotTo).not.toBeInTheDocument();

    const alakazamImage = screen.getByRole('img', { name: /alakazam sprite/i });
    expect(alakazamImage).toBeInTheDocument();

    userEvent.click(nextPokeBtn);

    const mewImage = screen.getByRole('img', { name: /mew sprite/i });
    expect(mewImage).toBeInTheDocument();
    expect(allPokemonsButton).toBeInTheDocument();

    const alakazamName = screen.queryByText(/alakazam/i);
    expect(alakazamName).not.toBeInTheDocument();

    userEvent.click(allPokemonsButton);
    const pikachuImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImage).toBeInTheDocument();
    expect(allPokemonsButton).toBeInTheDocument();
  });
});
