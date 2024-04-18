import { useEffect } from 'react';

import { SocketIoAdapter } from '@/main/adapter/socket.io-adapter';

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
    client.emit('join-queue');
  };

  return { joinQueue };
};
