import { envs } from '@/main/config/envs';
import { io, ManagerOptions } from 'socket.io-client';

export const SocketIoAdapter = () => {
  const options: Partial<ManagerOptions> = {
    autoConnect: false,
  };

  const client = io(envs.API_HTTP_URL || '', options);

  return client;
};
