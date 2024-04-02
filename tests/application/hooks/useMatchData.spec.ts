import '@testing-library/jest-dom';

import { act, renderHook } from '@testing-library/react';

import { UseMatchData } from '@/application/hooks/useMatchData';

describe('UseMatchData Hook', () => {
  test('Should initialize matchData with default data', () => {
    const { result } = renderHook(() => UseMatchData());
    expect(result.current.matchData.wpm).toBe(0);
  });

  test('Should increment wpm correctly', () => {
    const { result } = renderHook(() => UseMatchData());

    act(() => {
      result.current.dispatchMatchData({ type: 'increment_wpm' });
    });

    expect(result.current.matchData.wpm).toBe(1);
  });
});
