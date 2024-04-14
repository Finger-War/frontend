'use client';

import '@/core/presentation/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const QueryCLient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={QueryCLient}>
      {children}
      <Analytics />
      <SpeedInsights />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
