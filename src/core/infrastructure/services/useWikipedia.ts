import { htmlToText, symbolsToText } from '@/infrastructure/utils';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export type ErrorDetails = {
  message?: string;
  response?: {
    status: number;
    data: {
      code: string;
      message?: string;
    };
  };
};

const baseUrl = 'https://pt.wikipedia.org';

async function getWikipediaRandomWords(): Promise<string[]> {
  const randomSummaryResponse = await fetch(
    `${baseUrl}/api/rest_v1/page/random/summary`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((response) => response.json());

  const { pageid } = randomSummaryResponse;

  const randomWordsResponse = await fetch(
    `${baseUrl}/w/api.php?action=query&format=json&pageids=${pageid}&prop=extracts&exintro=true&origin=*`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((response) => response.json());

  const text = randomWordsResponse.query.pages[pageid].extract;

  const textInOneParagraph = text.replace(/<\/p><p>+/g, ' ');

  const textHtmlToText = htmlToText(textInOneParagraph);

  const textWithoutReferenceLinks = textHtmlToText.replace(/\[\d+\]/gi, '');

  const textWithoutInvisibleCharacteres = textWithoutReferenceLinks.replace(
    /[\u200B-\u200D\uFEFF]/g,
    '',
  );

  const textSymbolToText = symbolsToText(textWithoutInvisibleCharacteres);

  const textWithoutWhiteSpace = textSymbolToText.replace(/\s+/g, ' ');

  const textTrimmed = textWithoutWhiteSpace.trim();

  const array = textTrimmed.split(' ');

  const words = Array.from(
    { length: 10 },
    () => array[Math.floor(Math.random() * array.length)],
  );

  return words;
}

export interface IUseWikipedia {
  query: UseQueryResult<string[], ErrorDetails>;
}

export const UseWikipedia = (): IUseWikipedia => {
  const query = useQuery<string[], ErrorDetails>({
    queryKey: ['wikipedia'],
    queryFn: () => getWikipediaRandomWords(),
  });

  return { query };
};
