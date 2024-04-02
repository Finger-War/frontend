import '@testing-library/jest-dom';

import React from 'react';

import { render } from '@testing-library/react';

import { Home } from '@/application/pages/home';

describe('Home Page', () => {
  test('Should renders correctly', () => {
    const { getByText } = render(<Home />);

    expect(getByText('Start Playing')).toBeInTheDocument();
    expect(getByText('Play')).toBeInTheDocument();
  });
});
