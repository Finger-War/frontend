import { HomePage } from '@/application/pages/home';
import { UseWikipedia } from '@/infrastructure/services/useWikipedia';

export const MakeHome = () => {
  const { query } = UseWikipedia();

  const { isLoading, data: words } = query;

  if (isLoading || !words) {
    return;
  }

  return <HomePage words={words} />;
};
