'use client';

import React, { useState } from 'react';

import { IWikipediaService } from '@/infrastructure/services/wikipedia-service';
import { Footer } from '@/presentation/components/layout/footer';
import { Header } from '@/presentation/components/layout/header';
import { Button } from '@/presentation/components/ui/button';
import { LoadingSpinner } from '@/presentation/components/ui/spinner';
import { UseMatchData } from '@/presentation/hooks/useMatchData';

import { Game } from './components/game';
import { Timer } from './components/timer';
import { Wpm } from './components/wpm';

interface Props {
  makeLoadRandomWords: IWikipediaService;
}

export const HomePage: React.FC<Props> = ({ makeLoadRandomWords }: Props) => {
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

  const { isLoading, data: words } = makeLoadRandomWords.query;

  if (isLoading || !words) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <p className="text-2xl font-medium">Loading</p>
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />

      {!isPlaying ? (
        <div className="flex flex-col justify-center items-center space-y-6">
          <p className="text-2xl font-medium">Start Playing</p>
          {showWpm && <Wpm data-test="wpm" value={matchData.wpm} />}

          <Button data-test="play-button" size="lg" onClick={start}>
            Play
          </Button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-4">
          <Timer data-test="timer" initialTime={30} onTimeEnd={stop} />
          <Game
            data-test="game"
            words={words}
            onInputCorrectWord={onCorrectWord}
            enoughWords={stop}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};
