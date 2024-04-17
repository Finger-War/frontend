'use client';

import { WikipediaService } from '@/infrastructure/services/wikipedia-service';
import { UseMatchData } from '@/presentation/hooks/useMatchData';
import { HomePage } from '@/presentation/pages/home';

const MakeHome = () => {
  return (
    <HomePage
      makeLoadRandomWords={WikipediaService()}
      makeMatchData={UseMatchData()}
    />
  );
};

export default MakeHome;
