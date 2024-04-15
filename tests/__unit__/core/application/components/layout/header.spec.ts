import { Header } from '@/presentation/components/layout/header';
import { render } from '@testing-library/react';

describe('Header Component', () => {
  test('Should renders correctly', () => {
    const { container } = render(Header());

    const headerElement = container.querySelector('header');

    expect(headerElement).toBeInTheDocument();
  });
});
