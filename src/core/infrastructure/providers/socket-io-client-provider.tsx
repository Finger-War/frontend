import { useEffect } from 'react';

import { SocketIoClientAdapter } from '../adapters/socket-io-client-adapter';

export const SocketIoClient = SocketIoClientAdapter();

export const SocketIoClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    SocketIoClient.connect();

    return () => {
      SocketIoClient.disconnect();
    };
  }, []);

  return <>{children}</>;
};
