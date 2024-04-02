import '@testing-library/jest-dom';

import React from 'react';

import { render } from '@testing-library/react';

import { Game } from '@/application/pages/home/components/game';

describe('Game Component', () => {
  test('Should render correctly', () => {
    const words = ['apple', 'banana', 'orange'];
    const { getByPlaceholderText, getByText } = render(<Game words={words} />);

    words.forEach((word) => {
      expect(getByText(word)).toBeInTheDocument();
    });

    expect(getByPlaceholderText('Type here.....')).toBeInTheDocument();
  });
});
