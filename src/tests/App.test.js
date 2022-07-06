import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />',
  () => {
    it(`Teste se o topo da aplicação contém 
    um conjunto fixo de links de navegação:`, () => {
      const links = ['Home', 'About', 'Favorite Pokémons'];
      renderWithRouter(<App />);
      links.forEach((link) => {
        expect(screen.getAllByRole('link', { name: `${link}` }));
      });
    });
  });
