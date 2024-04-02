import '@testing-library/jest-dom';

import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react';

import { Game } from '@/application/pages/home/components/game';

describe('Game Component', () => {
  test('Should render correctly', () => {
    const words = ['first', 'second', 'third'];
    const { getByPlaceholderText, getByText } = render(<Game words={words} />);

    words.forEach((word) => {
      expect(getByText(word)).toBeInTheDocument();
    });

    expect(getByPlaceholderText('Type here.....')).toBeInTheDocument();
  });

  test('Should trigger correct word', async () => {
    const words = ['first', 'second', 'third'];
    const onInputCorrectWordMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Game words={words} onInputCorrectWord={onInputCorrectWordMock} />,
    );

    const inputElement = getByPlaceholderText('Type here.....');

    fireEvent.change(inputElement, { target: { value: 'first ' } });
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });

    await waitFor(() => {
      expect(onInputCorrectWordMock).toHaveBeenCalledWith('first');
    });
  });
});
