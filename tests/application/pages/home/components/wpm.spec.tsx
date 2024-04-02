import '@testing-library/jest-dom';

import { Wpm } from '@/application/pages/home/components/wpm';

import { render } from '@testing-library/react';

describe('Wpm Component', () => {
  test('Should renders value correctly', () => {
    const any_value = 0;

    const { getByText } = render(<Wpm value={any_value} />);

    expect(getByText(`WPM: ${any_value}`)).toBeInTheDocument();
  });
});
