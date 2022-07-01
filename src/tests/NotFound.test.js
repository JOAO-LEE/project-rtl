import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

describe('4. Teste o componente <NotFound.js />', () => {
  test('Se a página contém um h2 com o texto "Page requested not found"', () => {
    render(<NotFound />);

    const notFoundText = screen.getByRole('heading',
      { name: /page requested not found /i, level: 2 });

    expect(notFoundText).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageDescription = 'Pikachu crying because the page requested was not found';
    const imageEl = screen.getByRole('img',
      { name: imageDescription });

    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toHaveAttribute('src', imageUrl);
  });
});
