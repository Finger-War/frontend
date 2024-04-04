import { HomePage } from '@/application/pages/home';
import { UseWikipedia } from '@/infrastructure/services/useWikipedia';

export const MakeHome = () => {
  const { query } = UseWikipedia();

  return <HomePage query={query} />;
};
