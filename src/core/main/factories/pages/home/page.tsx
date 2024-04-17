'use client';

import { WikipediaService } from '@/infrastructure/services/wikipedia-service';
import { HomePage } from '@/presentation/pages/home';

const MakeHome = () => {
  return <HomePage makeLoadRandomWords={WikipediaService()} />;
};

export default MakeHome;
