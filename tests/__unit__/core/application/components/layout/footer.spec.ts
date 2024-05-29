import { Footer } from '@/presentation/components/layout/footer';
import { render } from '@testing-library/react';

describe('Footer Component', () => {
  test('Should renders correctly', () => {
    const { container } = render(Footer());

    const footerElement = container.querySelector('footer');

    expect(footerElement).toBeInTheDocument();
  });
});
