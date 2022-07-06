import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />',
  () => {
    test(`Teste se o topo da aplicação contém 
    um conjunto fixo de links de navegação:`, () => {
      const links = ['Home', 'About', 'Favorite Pokémons'];
      renderWithRouter(<App />);
      links.forEach((link) => {
        expect(screen.getAllByRole('link', { name: `${link}` }));
      });
    });
    test(`Teste se a aplicação é redirecionada para a página inicial,
    na URL / ao clicar no link Home da barra de navegação`, () => {
      const { history } = renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toBeInTheDocument();

      userEvent.click(homeLink);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });
    test(`Teste se a aplicação é redirecionada para a página de About, 
    na URL /about, ao clicar no link About da barra de navegação`, () => {
      const { history } = renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeInTheDocument();

      userEvent.click(aboutLink);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');
    });
    test(`Teste se a aplicação é redirecionada para a 
    página de Pokémons Favoritados, na URL /favorites, 
    ao clicar no link "Favorite Pokémons" da barra de navegação`, () => {
      const { history } = renderWithRouter(<App />);

      const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(favoriteLink).toBeInTheDocument();

      userEvent.click(favoriteLink);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });

    test(`Teste se a aplicação é redirecionada para a 
    página Not Found ao entrar em uma URL desconhecida.`, () => {
      const { history } = renderWithRouter(<App />);

      history.push('/digimonehmelhor');
      const { location: { pathname } } = history;
      expect(pathname).toBe('/digimonehmelhor');

      const notFoundAlert = screen.getByRole('heading',
        { name: /page requested not found crying emoji/i });
      const cryingPikachu = screen.getByRole('img',
        { name: /pikachu crying because the page requested was not found/i });
      expect(notFoundAlert).toBeInTheDocument();
      expect(cryingPikachu).toBeInTheDocument();
    });
  });
