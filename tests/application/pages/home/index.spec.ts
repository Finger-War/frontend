import '@testing-library/jest-dom';

import { Home } from '@/application/pages/home';

import { render } from '@testing-library/react';

describe('Home Page', () => {
  test('Should renders correctly initials element', () => {
    const { container } = render(Home());

    const headerElement = container.querySelector('header');
    const footerElement = container.querySelector('footer');

    expect(headerElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });
});
