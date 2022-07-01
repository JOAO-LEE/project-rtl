import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import pokemons from '../data';

const pikachuId = 25;
const charmanderId = 4;

describe('5. Teste o componente <Pokedex.js />', () => {
  test('Se a página contém um  h2 com o texto "Encountered pokémons"', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pikachuId } />
      </MemoryRouter>,
    );
    const headingText = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(headingText).toBeInTheDocument();
  });
  test('se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado',
    () => {
      render(
        <MemoryRouter>
          <Pokedex
            pokemons={ pokemons }
            isPokemonFavoriteById={ pikachuId && charmanderId }
          />
        </MemoryRouter>,
      );
      const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(nextPokemonButton).toBeInTheDocument();
      expect(nextPokemonButton).toHaveAttribute('type', 'button');

      const pikachuImage = screen.getByRole('img', { name: /pikachu sprite/i });
      expect(pikachuImage).toBeInTheDocument();

      userEvent.click(nextPokemonButton);

      const charmanderImage = screen.getByRole('img', { name: /charmander sprite/i });
      expect(charmanderImage).toBeInTheDocument();
    });
});
