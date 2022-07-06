// import { PureComponent } from 'react/cjs/react.production.min';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import PokemonDetails from '../pages/PokemonDetails';

const pokemonPath = '/pokemons/25';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  test(`Teste se as informações detalhadas do pokémon
  selecionado são mostradas na tela`, () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(pokemonPath);

    expect(detailsLink).not.toBeInTheDocument();

    const pikachuHeading = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pikachuHeading).toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summaryHeading).toBeInTheDocument();

    const detail = screen.getByText(/this intelligent pokémon roasts hard berries with/i);
    expect(detail).toBeInTheDocument();
  });
  test(`Teste se existe na página uma seção com 
  os mapas contendo as localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(pokemonPath);

    const gameLocationsText = screen.getByRole('heading',
      { name: /game locations of pikachu/i, level: 2 });
    expect(gameLocationsText).toBeInTheDocument();

    const pikachuFirstLocation = screen.getByText(/kanto viridian forest/i);
    expect(pikachuFirstLocation).toBeInTheDocument();

    const pikachuFirstMap = screen.getAllByRole('img', { name: /pikachu location/i })[0];
    expect(pikachuFirstMap).toBeInTheDocument();
    expect(pikachuFirstMap).toHaveAttribute('src', 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
    expect(pikachuFirstMap).toHaveAttribute('alt', 'Pikachu location');

    const pikachuSecondLocation = screen.getByText(/kanto power plant/i);
    expect(pikachuSecondLocation).toBeInTheDocument();

    const pikachuSecondMap = screen.getAllByRole('img', { name: /pikachu location/i })[1];
    expect(pikachuSecondMap).toBeInTheDocument();
    expect(pikachuSecondMap).toHaveAttribute('src', 'https://pwo-wiki.info/images/5/5b/Pp.gif');
    expect(pikachuSecondMap).toHaveAttribute('alt', 'Pikachu location');
  });
  test(`Teste se o usuário pode favoritar um pokémon
  através da página de detalhes`, () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(pokemonPath);

    const favCheckbox = screen.getByText(/pokémon favoritado\?/i);
    expect(favCheckbox).toBeInTheDocument();

    userEvent.click(favCheckbox);

    const favPikachu = screen.getByRole('img',
      { name: /pikachu is marked as favorite/i });
    expect(favPikachu).toBeInTheDocument();

    userEvent.click(favCheckbox);
    expect(favPikachu).not.toBeInTheDocument();
  });
});
