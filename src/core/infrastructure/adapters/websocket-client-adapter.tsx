import { envs } from '@/main/config/envs';
import { Channel, Socket } from 'phoenix';

export let client: Socket | null = null;

export const getWebSocket = (): Socket => {
  if (!client) {
    return connectWebSocket();
  }

  return client;
};

export const connectWebSocket = (): Socket => {
  if (!client) {
    client = new Socket(envs.BACKEND_API_URL);
    client.connect();

    return client;
  }

  return client;
};

export const disconnectWebSocket = (): void => {
  if (!client) {
    return;
  }

  client.disconnect();
  client = null;
};

export const JoinChannel = (channelName: string): Channel => {
  const client = getWebSocket();

  const channel = client.channel(channelName);

  channel.join();

  return channel;
};
