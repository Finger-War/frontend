import '@testing-library/jest-dom';

import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { HomePage } from '@/application/pages/home';

describe('Home Page', () => {
  test('Should renders correctly', () => {
    const words = ['first', 'second', 'third'];
    const { getByText } = render(<HomePage words={words} />);

    expect(getByText('Start Playing')).toBeInTheDocument();
    expect(getByText('Play')).toBeInTheDocument();
  });

  test('Should renders timer and game after start playing', async () => {
    const words = ['first', 'second', 'third'];
    const { container, getByText } = render(<HomePage words={words} />);

    const textElement = getByText('Start Playing');
    const buttonElement = getByText('Play');

    fireEvent.click(buttonElement);

    const timeElement = container.querySelector('#timer');
    const gameElement = container.querySelector('#game');

    expect(buttonElement).not.toBeInTheDocument();
    expect(textElement).not.toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
    expect(gameElement).toBeInTheDocument();
  });
});
