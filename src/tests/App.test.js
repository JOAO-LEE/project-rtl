import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    it('O primeiro link deve possuir o texto "Home"', () => {
      render(<MemoryRouter><App /></MemoryRouter>);
      const linkToHome = screen.getByRole('link', { name: /home/i });
      expect(linkToHome).toBeInTheDocument();
    });
    it('O segundo link deve possuir o texto "About"', () => {
      render(<MemoryRouter><App /></MemoryRouter>);
      const linkToAbout = screen.getByRole('link', { name: /about/i });
      expect(linkToAbout).toBeInTheDocument();
    });
    it('O terceiro link deve possuir o texto "Favorite Pokémons"', () => {
      render(<MemoryRouter><App /></MemoryRouter>);
      const linkToFavorites = screen.getByRole('link',
        { name: /favorite pokémons/i });
      expect(linkToFavorites).toBeInTheDocument();
    });
  });
/* acessar os elementos da tela
interagir com os elementos (se necessário)
fazer os tests (expects) */
