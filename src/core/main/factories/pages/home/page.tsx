'use client';

import { UseMatchQueue } from '@/presentation/hooks/useMatchQueue';
import { HomePage } from '@/presentation/pages/home';

const MakeHome = () => {
  return <HomePage makeMatchQueue={UseMatchQueue()} />;
};

export default MakeHome;
