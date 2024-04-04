import React, { useState } from 'react';

import { Footer } from '@/application/components/layout/footer';
import { Header } from '@/application/components/layout/header';
import { Button } from '@/application/components/ui/button';

import { Game } from './components/game';
import { Timer } from './components/timer';
import { Wpm } from './components/wpm';

import { UseMatchData } from '@/application/hooks/useMatchData';
import { UseQueryResult } from '@tanstack/react-query';

import {
  WikipediaRandomWords,
  ErrorDetails,
} from '@/infrastructure/services/useWikipedia';

interface IHomePage {
  query: UseQueryResult<WikipediaRandomWords, ErrorDetails>;
}

export const HomePage = ({ query }: IHomePage) => {
  const [showWpm, setShowWpm] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { matchData, dispatchMatchData } = UseMatchData();

  const start = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);

    setShowWpm(true);
  };

  const onCorrectWord = () => {
    dispatchMatchData({ type: 'increment_wpm' });
  };

  const { isLoading, data: words } = query;

  if (isLoading || !words) {
    return;
  }

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />

      {!isPlaying ? (
        <div className="flex flex-col justify-center items-center space-y-6">
          <p className="text-2xl font-medium">Start Playing</p>
          {showWpm && <Wpm value={matchData.wpm} />}

          <Button size="lg" onClick={start}>
            <p id="play-buton">Play</p>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-4">
          <Timer initialTime={30} onTimeEnd={stop} />
          <Game words={words} onInputCorrectWord={onCorrectWord} />
        </div>
      )}

      <Footer />
    </div>
  );
};
