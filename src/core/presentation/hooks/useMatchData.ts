import { useReducer } from 'react';

interface IState {
  wpm: number;
}

interface IAction {
  type: 'increment_wpm';
}

export interface IUseMatchData {
  matchData: IState;
  dispatchMatchData: React.Dispatch<IAction>;
}

export const UseMatchData = (): IUseMatchData => {
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
