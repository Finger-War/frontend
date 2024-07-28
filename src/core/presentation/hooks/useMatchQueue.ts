import { useEffect, useState } from 'react';

import { Match } from '@/domain/entities/match';
import { JoinChannel } from '@/infrastructure/adapters/websocket-client-adapter';
import { GameConstants } from '@/main/constants/game-constants';
import { Channel } from 'phoenix';

type IMatchResult = Match & {
  result: { isTie: string; status: string; winner: string; words: number };
};

type IMatchError = {
  errorMessage: string;
};

export interface IUseMatchQueue {
  informations: { connectedPlayers: number };
  joinQueue: () => void;
  getOutQueue: () => void;
  isMatch: boolean;
  words: string[];
  setIsMatch: (value: boolean) => void;
  matchTime: number;
  setMatchTime: (value: number) => void;
  handleWord: (value: string) => void;
  handleCorrectWord: (value: string) => void;
  matchResult: IMatchResult | undefined;
  matchError: IMatchError | undefined;
  adversaryWords: string;
  setAdversaryWords: (value: string) => void;
}

export const UseMatchQueue = (): IUseMatchQueue => {
  const [queueChannel, setQueueChannel] = useState<Channel | null>(null);

  const [informations, setinformations] = useState<{
    connectedPlayers: number;
  }>({
    connectedPlayers: 0,
  });
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [words, setWords] = useState<string[]>([]);
  const [matchTime, setMatchTime] = useState<number>(0);
  const [matchResult, setMatchResult] = useState<IMatchResult | undefined>();
  const [matchError, setMatchError] = useState<IMatchError | undefined>();
  const [adversaryWords, setAdversaryWords] = useState<string>('');

  const onInformations = (value: { connectedPlayers: number }) => {
    setinformations(value);
  };

  const joinQueue = () => {
    if (!queueChannel) {
      return;
    }

    queueChannel.push(GameConstants.server.joinQueue, {});
  };

  const getOutQueue = () => {
    if (!queueChannel) {
      return;
    }

    queueChannel.push(GameConstants.server.getOutQueue, {});
  };

  const onMatchStart = (words: string[]) => {
    setWords(words);
    setIsMatch(true);
  };

  const onMatchStop = () => {
    setWords([]);
    setIsMatch(false);
  };

  const handleWord = (value: string) => {
    if (!queueChannel) {
      return;
    }

    queueChannel.push(GameConstants.server.handleWord, { word: value });
  };

  const handleCorrectWord = (value: string) => {
    if (!queueChannel) {
      return;
    }

    queueChannel.push(GameConstants.server.handleCorrectWord, { word: value });
  };

  const onMatchResult = (value: IMatchResult) => {
    setMatchResult(value);
  };

  const onMatchError = (value: IMatchError) => {
    setMatchError(value);

    if (!queueChannel) {
      return;
    }

    queueChannel.push(GameConstants.server.clientError, {});
  };

  const onAdversaryWords = (value: string) => setAdversaryWords(value);

  useEffect(() => {
    if (typeof window == 'undefined') {
      return;
    }

    const queueChannel = JoinChannel('queue:lobby');

    queueChannel.on(GameConstants.client.informations, onInformations);
    queueChannel.on(GameConstants.client.matchStart, onMatchStart);
    queueChannel.on(GameConstants.client.matchStop, onMatchStop);
    queueChannel.on(GameConstants.client.matchTimer, (time) =>
      setMatchTime(time),
    );
    queueChannel.on(GameConstants.client.matchResult, onMatchResult);
    queueChannel.on(GameConstants.client.serverError, onMatchError);
    queueChannel.on(GameConstants.client.adversaryWords, onAdversaryWords);

    setQueueChannel(queueChannel);

    return () => {
      queueChannel.leave();
    };
  }, [typeof window]);

  return {
    informations,
    joinQueue,
    getOutQueue,
    isMatch,
    setIsMatch,
    words,
    matchTime,
    setMatchTime,
    handleWord,
    handleCorrectWord,
    matchResult,
    matchError,
    adversaryWords,
    setAdversaryWords,
  };
};
