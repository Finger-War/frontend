import { useEffect } from 'react';

import {
  connectWebSocket,
  disconnectWebSocket,
} from '@/infrastructure/adapters/websocket-client-adapter';

export const WebsocketClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, []);

  return <>{children}</>;
};
