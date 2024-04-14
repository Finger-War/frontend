'use client';

import { IUseWikipedia } from '@/core/infrastructure/services/useWikipedia';
import { Footer } from '@/core/presentation/components/layout/footer';
import { Header } from '@/core/presentation/components/layout/header';
import { Button } from '@/core/presentation/components/ui/button';
import { LoadingSpinner } from '@/core/presentation/components/ui/spinner';
import { UseMatchData } from '@/core/presentation/hooks/useMatchData';
import React, { useState } from 'react';

import { Game } from './components/game';
import { Timer } from './components/timer';
import { Wpm } from './components/wpm';

interface Props {
  makeLoadRandomWords: IUseWikipedia;
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
