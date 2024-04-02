import { useReducer } from 'react';

interface IState {
  wpm: number;
}

interface IAction {
  type: 'increment_wpm';
}

export const UseMatchData = () => {
  const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
      case 'increment_wpm':
        return { wpm: state.wpm + 1 };
      default:
        return state;
    }
  };

  const [matchData, dispatchMatchData] = useReducer(reducer, { wpm: 0 });

  return { matchData, dispatchMatchData };
};
