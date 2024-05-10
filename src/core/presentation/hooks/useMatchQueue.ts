import { useEffect, useState } from 'react';

import { SocketIoClient } from '@/infrastructure/providers/socket-io-client-provider';
import { GameConstants } from '@/main/constants/game-constants';

export interface IUseMatchQueue {
  joinQueue: () => void;
  getOutQueue: () => void;
  isMatch: boolean;
  stopMatch: () => void;
}

export const UseMatchQueue = (): IUseMatchQueue => {
  const [isMatch, setIsMatch] = useState<boolean>(false);

  const joinQueue = () => {
    SocketIoClient.emit(GameConstants.server.joinQueue);
  };

  const getOutQueue = () => {
    SocketIoClient.emit(GameConstants.server.getOutQueue);
  };

  const stopMatch = () => setIsMatch(false);

  useEffect(() => {
    SocketIoClient.on(GameConstants.server.matchStart, () => setIsMatch(true));
  }, []);

  return { joinQueue, getOutQueue, isMatch, stopMatch };
};
