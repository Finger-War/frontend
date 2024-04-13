'use client';

import { UseWikipedia } from '@/core/infrastructure/services/useWikipedia';
import { HomePage } from '@/core/presentation/pages/home';

const MakeHome = () => {
  return <HomePage makeLoadRandomWords={UseWikipedia()} />;
};

export default MakeHome;
