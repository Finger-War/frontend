import { envs } from '@/main/config/envs';
import { io, ManagerOptions } from 'socket.io-client';

export const SocketIoClientAdapter = () => {
  const options: Partial<ManagerOptions> = {
    autoConnect: false,
  };

  const client = io(envs.BACKEND_API_URL, options);

  return client;
};
