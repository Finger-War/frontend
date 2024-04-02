import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { Timer } from '@/application/pages/home/components/timer';

describe('Timer component', () => {
  test('Should renders value correctly', () => {
    const any_value = 0;

    const { getByText } = render(<Timer initialTime={any_value} />);

    expect(getByText(`Time: ${any_value}`)).toBeInTheDocument();
  });
});
