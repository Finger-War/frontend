import React from 'react';

import { Footer } from '@/application/components/layout/footer';
import { Header } from '@/application/components/layout/header';

export const Home = (): React.JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <Footer />
    </div>
  );
};
