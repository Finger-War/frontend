import { useEffect, useState } from 'react';

import { SocketIoClient } from '@/infrastructure/providers/socket-io-client-provider';
import { GameConstants } from '@/main/constants/game-constants';

export interface IUseMatchQueue {
  joinQueue: () => void;
  getOutQueue: () => void;
  isMatch: boolean;
  setIsMatch: (value: boolean) => void;
  handleWord: (value: string) => void;
  adversaryWords: string;
  setAdversaryWords: (value: string) => void;
}

export const UseMatchQueue = (): IUseMatchQueue => {
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [adversaryWords, setAdversaryWords] = useState<string>('');

  const joinQueue = () => {
    SocketIoClient.emit(GameConstants.server.joinQueue);
  };

  const getOutQueue = () => {
    SocketIoClient.emit(GameConstants.server.getOutQueue);
  };

  const handleWord = (value: string) => {
    SocketIoClient.emit(GameConstants.server.handleWord, value);
  };

  const onAdversaryWords = (value: string) => setAdversaryWords(value);

  useEffect(() => {
    SocketIoClient.on(GameConstants.server.matchStart, () => setIsMatch(true));
    SocketIoClient.on(GameConstants.server.adversaryWords, onAdversaryWords);
  }, []);

  return {
    joinQueue,
    getOutQueue,
    isMatch,
    setIsMatch,
    handleWord,
    adversaryWords,
    setAdversaryWords,
  };
};
