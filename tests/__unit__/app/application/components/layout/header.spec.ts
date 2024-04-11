import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { Header } from '@/application/components/layout/header';

describe('Header Component', () => {
  test('Should renders correctly', () => {
    const { container } = render(Header());

    const headerElement = container.querySelector('header');

    expect(headerElement).toBeInTheDocument();
  });
});
