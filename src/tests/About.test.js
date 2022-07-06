import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('2. Teste o componente <About.js />', () => {
  test(`Teste se a página contém as informações sobre a Pokédex;
  Teste se a página contém um heading "h2" com o texto "About Pokédex`, () => {
    render(<About />);
    const aboutHeadingText = screen.getByRole('heading',
      { name: /about pokédex/i, level: 2 });
    expect(aboutHeadingText).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const aboutParagraphs = screen.getAllByText(/pokémons/i);
    expect(aboutParagraphs).toHaveLength(2);
  });

  test(`Teste se a página contém a seguinte imagem de uma Pokédex: 
  https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`, () => {
    render(<About />);
    const pokedexUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImg = screen.getByAltText(/pokédex/i);
    expect(pokedexImg).toHaveAttribute('src', pokedexUrl);
  });
});
/* acessar os elementos da tela
interagir com os elementos (se necessário)
fazer os tests (expects) */
