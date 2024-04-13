import { act, renderHook } from '@testing-library/react';

import { UseMatchData } from '@/core/presentation/hooks/useMatchData';

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

  test('Should return initial state if invalid type is provided', () => {
    const { result } = renderHook(() => UseMatchData());

    const initialMatchData = result.current.matchData;

    act(() => {
      result.current.dispatchMatchData({ type: 'unknown_action' } as any);
    });

    expect(result.current.matchData).toEqual(initialMatchData);
  });
});
