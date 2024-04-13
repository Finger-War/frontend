'use client';

import React, { useEffect, useState } from 'react';

import { Footer } from '@/core/application/components/layout/footer';
import { Header } from '@/core/application/components/layout/header';
import { Button } from '@/core/application/components/ui/button';

import { Game } from './components/game';
import { Timer } from './components/timer';
import { Wpm } from './components/wpm';

import { UseMatchData } from '@/core/application/hooks/useMatchData';
import { UseQueryResult } from '@tanstack/react-query';

import {
  WikipediaRandomWords,
  ErrorDetails,
} from '@/core/infrastructure/services/useWikipedia';
import { LoadingSpinner } from '@/core/application/components/ui/spinner';
import { SocketIoAdapter } from '@/core/main/adapter/socket.io-adapter';

interface IHomePage {
  query: UseQueryResult<WikipediaRandomWords, ErrorDetails>;
}

export const HomePage = ({ query }: IHomePage) => {
  const [showWpm, setShowWpm] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const client = SocketIoAdapter();

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

  useEffect(() => {
    client.connect();
  }, []);

  const { isLoading, data: words } = query;

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
