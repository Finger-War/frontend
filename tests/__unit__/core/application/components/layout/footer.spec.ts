import { render } from '@testing-library/react';

import { Footer } from '@/core/application/components/layout/footer';

describe('Footer Component', () => {
  test('Should renders correctly', () => {
    const { container } = render(Footer());

    const footerElement = container.querySelector('footer');

    expect(footerElement).toBeInTheDocument();
  });
});
