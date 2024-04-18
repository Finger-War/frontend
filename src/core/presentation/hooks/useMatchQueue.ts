import { useEffect } from 'react';

import { SocketIoAdapter } from '@/main/adapter/socket.io-adapter';
import { GameConstants } from '@/main/constants/game-constants';

export interface IUseMatchQueue {
  joinQueue: () => void;
}

export const UseMatchQueue = (): IUseMatchQueue => {
  const client = SocketIoAdapter();

  useEffect(() => {
    client.connect();

    return () => {
      getOutQueue();

      client.disconnect();
    };
  }, []);

  const joinQueue = () => {
    client.emit(GameConstants.server.joinQueue);
  };

  const getOutQueue = () => {
    client.emit(GameConstants.server.getOutQueue);
  };

  return { joinQueue };
};
