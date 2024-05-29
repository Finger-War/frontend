'use client';

import React, { useEffect, useState } from 'react';

import { Footer } from '@/presentation/components/layout/footer';
import { Header } from '@/presentation/components/layout/header';
import { Button } from '@/presentation/components/ui/button';
import { LoadingSpinner } from '@/presentation/components/ui/spinner';
import { IUseMatchQueue } from '@/presentation/hooks/useMatchQueue';

import { Game } from './components/game';
import { Wpm } from './components/wpm';

interface Props {
  makeMatchQueue: IUseMatchQueue;
}

export const HomePage: React.FC<Props> = ({ makeMatchQueue }: Props) => {
  const {
    informations,
    joinQueue,
    isMatch,
    setIsMatch,
    handleCorrectWord,
    words,
    matchTime,
    handleWord,
    matchResult,
  } = makeMatchQueue;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const start = () => {
    setIsLoading(true);
    joinQueue();
  };

  const stop = () => {
    setIsMatch(false);
  };

  const onCorrectWord = (value: string) => {
    handleCorrectWord(value);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [isMatch]);

  if (isLoading) {
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

          {matchResult && (
            <div className="flex flex-col items-center">
              {matchResult.result.status === 'winner' && (
                <p className="text-1xl font-medium">😊 You won the match</p>
              )}
              {matchResult.result.status === 'is-tie' && (
                <p className="text-1xl font-medium">🤔 You tied the match</p>
              )}
              {matchResult.result.status === 'loser' && (
                <p className="text-1xl font-medium">😞 You lost the match</p>
              )}
              {<Wpm data-test="wpm" value={matchResult.result.words} />}
            </div>
          )}

          <Button data-test="play-button" size="lg" onClick={start}>
            Play
          </Button>

          <p className="text-1xl font-semibold">
            🔥 Connected Players: {informations.connectedPlayers}
          </p>
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
