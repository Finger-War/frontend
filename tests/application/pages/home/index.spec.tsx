import '@testing-library/jest-dom';

import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { Home } from '@/application/pages/home';

describe('Home Page', () => {
  test('Should renders correctly', () => {
    const { getByText } = render(<Home />);

    expect(getByText('Start Playing')).toBeInTheDocument();
    expect(getByText('Play')).toBeInTheDocument();
  });

  test('Should renders timer and game after start playing', async () => {
    const { container, getByText } = render(<Home />);

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
