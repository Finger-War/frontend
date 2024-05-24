'use client';

import { UseMatchData } from '@/presentation/hooks/useMatchData';
import { UseMatchQueue } from '@/presentation/hooks/useMatchQueue';
import { HomePage } from '@/presentation/pages/home';

const MakeHome = () => {
  return (
    <HomePage makeMatchQueue={UseMatchQueue()} makeMatchData={UseMatchData()} />
  );
};

export default MakeHome;
