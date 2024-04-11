'use client';

import { HomePage } from '@/application/pages/home';
import { UseWikipedia } from '@/infrastructure/services/useWikipedia';

const MakeHome = () => {
  const { query } = UseWikipedia();

  return <HomePage query={query} />;
};

export default MakeHome;
