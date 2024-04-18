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
      client.disconnect();
    };
  }, []);

  const joinQueue = () => {
    client.emit(GameConstants.server.joinQueue);
  };

  return { joinQueue };
};
