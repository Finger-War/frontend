'use client';

import '@/presentation/global.css';
import { SocketIoClientProvider } from '@/infrastructure/providers/socket-io-client-provider';
import { Toaster } from '@/presentation/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const QueryCLient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={QueryCLient}>
      <SocketIoClientProvider>
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
        <ReactQueryDevtools initialIsOpen={false} />
      </SocketIoClientProvider>
    </QueryClientProvider>
  );
}
