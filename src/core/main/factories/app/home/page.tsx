'use client';

import { HomePage } from '@/core/application/pages/home';
import { UseWikipedia } from '@/core/infrastructure/services/useWikipedia';

const MakeHome = () => {
  const { query } = UseWikipedia();

  return <HomePage query={query} />;
};

export default MakeHome;
