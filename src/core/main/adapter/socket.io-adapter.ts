import { io, ManagerOptions } from 'socket.io-client';

export const SocketIoAdapter = () => {
  const options: Partial<ManagerOptions> = {
    autoConnect: false,
  };

  const client = io('http://localhost:5000', options);

  return client;
};
