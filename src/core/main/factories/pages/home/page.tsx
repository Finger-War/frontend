'use client';

import { WikipediaService } from '@/infrastructure/services/wikipedia-service';
import { UseMatchData } from '@/presentation/hooks/useMatchData';
import { UseMatchQueue } from '@/presentation/hooks/useMatchQueue';
import { HomePage } from '@/presentation/pages/home';

const MakeHome = () => {
  return (
    <HomePage
      makeLoadRandomWords={WikipediaService()}
      makeMatchQueue={UseMatchQueue()}
      makeMatchData={UseMatchData()}
    />
  );
};

export default MakeHome;
