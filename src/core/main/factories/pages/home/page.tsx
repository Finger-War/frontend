'use client';

import { UseWikipedia } from '@/infrastructure/services/useWikipedia';
import { HomePage } from '@/presentation/pages/home';

const MakeHome = () => {
  return <HomePage makeLoadRandomWords={UseWikipedia()} />;
};

export default MakeHome;
