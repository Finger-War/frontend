'use client';

import React, { useState } from 'react';

import { IWikipediaService } from '@/infrastructure/services/wikipedia-service';
import { Footer } from '@/presentation/components/layout/footer';
import { Header } from '@/presentation/components/layout/header';
import { Button } from '@/presentation/components/ui/button';
import { LoadingSpinner } from '@/presentation/components/ui/spinner';
import { IUseMatchData } from '@/presentation/hooks/useMatchData';
import { IUseMatchQueue } from '@/presentation/hooks/useMatchQueue';

import { Game } from './components/game';
import { Wpm } from './components/wpm';

interface Props {
  makeLoadRandomWords: IWikipediaService;
  makeMatchQueue: IUseMatchQueue;
  makeMatchData: IUseMatchData;
}

export const HomePage: React.FC<Props> = ({
  makeLoadRandomWords,
  makeMatchData,
  makeMatchQueue,
}: Props) => {
  const { joinQueue, isMatch, setIsMatch, matchTime, handleWord } =
    makeMatchQueue;
  const { matchData, dispatchMatchData } = makeMatchData;
  const { isLoading, data: words } = makeLoadRandomWords;

  const [showWpm, setShowWpm] = useState<boolean>(false);

  const start = () => {
    joinQueue();
  };

  const stop = () => {
    setIsMatch(false);

    setShowWpm(true);
  };

  const onCorrectWord = () => {
    dispatchMatchData({ type: 'increment_wpm' });
  };

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

      {!isMatch ? (
        <div className="flex flex-col justify-center items-center space-y-6">
          <p className="text-2xl font-medium">Start Playing</p>
          {showWpm && <Wpm data-test="wpm" value={matchData.wpm} />}

          <Button data-test="play-button" size="lg" onClick={start}>
            Play
          </Button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-4">
          <p data-test="timer" className="text-2xl font-semibold">
            Time: {matchTime}
          </p>
          <Game
            data-test="game"
            words={words}
            onInput={(value: string) => handleWord(value)}
            onInputCorrectWord={onCorrectWord}
            enoughWords={stop}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};
