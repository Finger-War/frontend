import '@testing-library/jest-dom';

import { Home } from '@/application/pages/home';

import { render, screen } from '@testing-library/react';

describe('Home Page', () => {
  test("Should return 'Hello, Fingerwar!'", () => {
    render(Home());

    const h1 = screen.getByText('Hello, Fingerwar!');

    expect(h1).toBeInTheDocument();
  });
});
