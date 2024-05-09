import { SocketIoClient } from '@/infrastructure/providers/socket-io-client-provider';
import { GameConstants } from '@/main/constants/game-constants';

export interface IUseMatchQueue {
  joinQueue: () => void;
  getOutQueue: () => void;
}

export const UseMatchQueue = (): IUseMatchQueue => {
  const joinQueue = () => {
    SocketIoClient.emit(GameConstants.server.joinQueue);
  };

  const getOutQueue = () => {
    SocketIoClient.emit(GameConstants.server.getOutQueue);
  };

  return { joinQueue, getOutQueue };
};
