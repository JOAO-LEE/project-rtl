import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  test('É exibido "No favorite pokemon found" caso a pessoa não tenha pokémons favoritos',
    () => {
      render(<FavoritePokemons />);
      const noFavoriteWarn = screen.getByText(/no favorite pokemon found/i);
      expect(noFavoriteWarn).toBeInTheDocument();
    });
});
