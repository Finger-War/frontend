import { useEffect, useState } from 'react';

import { Match } from '@/domain/entities/match';
import { SocketIoClient } from '@/infrastructure/providers/socket-io-client-provider';
import { GameConstants } from '@/main/constants/game-constants';

type IMatchResult = Match & {
  result: { isTie: string; status: string; winner: string; words: number };
};

type IMatchError = {
  errorMessage: string;
};

export interface IUseMatchQueue {
  informations: { connectedPlayers: number };
  joinQueue: () => void;
  getOutQueue: () => void;
  isMatch: boolean;
  words: string[];
  setIsMatch: (value: boolean) => void;
  matchTime: number;
  setMatchTime: (value: number) => void;
  handleWord: (value: string) => void;
  handleCorrectWord: (value: string) => void;
  matchResult: IMatchResult | undefined;
  matchError: IMatchError | undefined;
  adversaryWords: string;
  setAdversaryWords: (value: string) => void;
}

export const UseMatchQueue = (): IUseMatchQueue => {
  const [informations, setinformations] = useState<{
    connectedPlayers: number;
  }>({
    connectedPlayers: 0,
  });
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [words, setWords] = useState<string[]>([]);
  const [matchTime, setMatchTime] = useState<number>(0);
  const [matchResult, setMatchResult] = useState<IMatchResult | undefined>();
  const [matchError, setMatchError] = useState<IMatchError | undefined>();
  const [adversaryWords, setAdversaryWords] = useState<string>('');

  const oninformations = (value: { connectedPlayers: number }) => {
    setinformations(value);
  };

  const joinQueue = () => {
    SocketIoClient.emit(GameConstants.server.joinQueue);
  };

  const getOutQueue = () => {
    SocketIoClient.emit(GameConstants.server.getOutQueue);
  };

  const onMatchStart = (words: string[]) => {
    setWords(words);
    setIsMatch(true);
  };

  const onMatchStop = () => {
    setWords([]);
    setIsMatch(false);
  };

  const handleWord = (value: string) => {
    SocketIoClient.emit(GameConstants.server.handleWord, value);
  };

  const handleCorrectWord = (value: string) => {
    SocketIoClient.emit(GameConstants.server.handleCorrectWord, value);
  };

  const onMatchResult = (value: IMatchResult) => {
    setMatchResult(value);
  };

  const onMatchError = (value: IMatchError) => {
    setMatchError(value);
  };

  const onAdversaryWords = (value: string) => setAdversaryWords(value);

  useEffect(() => {
    SocketIoClient.on(GameConstants.client.informations, oninformations);
    SocketIoClient.on(GameConstants.client.matchStart, onMatchStart);
    SocketIoClient.on(GameConstants.client.matchStop, onMatchStop);
    SocketIoClient.on(GameConstants.client.matchTimer, (time) =>
      setMatchTime(time),
    );
    SocketIoClient.on(GameConstants.client.matchResult, onMatchResult);
    SocketIoClient.on(GameConstants.client.matchError, onMatchError);
    SocketIoClient.on(GameConstants.client.adversaryWords, onAdversaryWords);
  }, []);

  return {
    informations,
    joinQueue,
    getOutQueue,
    isMatch,
    setIsMatch,
    words,
    matchTime,
    setMatchTime,
    handleWord,
    handleCorrectWord,
    matchResult,
    matchError,
    adversaryWords,
    setAdversaryWords,
  };
};
