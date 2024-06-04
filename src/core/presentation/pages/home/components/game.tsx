import { useState, useEffect } from 'react';

import { Input } from '@/presentation/components/ui/input';
import { UseWordsBatch } from '@/presentation/hooks/useWordsBatch';

interface IGame {
  words: string[];
  onInput?: (value: string) => void;
  onInputCorrectWord?: (value: string) => void;
  onInputWrongWord?: (value: string) => void;
}

export const Game = ({
  words,
  onInput,
  onInputCorrectWord,
  onInputWrongWord,
  ...rest
}: IGame) => {
  const batchSize = 30;

  const [input, setInput] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [wordsStatus, setWordStatus] = useState<Record<string, string>>({});

  const { currentBatch, loadNextBatch } = UseWordsBatch(words, batchSize);

  const addCorrectWord = (input: string) => {
    wordsStatus[currentWordIndex] = 'correct';

    setCurrentWordIndex((prev) => prev + 1);

    onInputCorrectWord?.(input);

    resetInput();
  };

  const addWrongWord = (input: string) => {
    wordsStatus[currentWordIndex] = 'wrong';

    setCurrentWordIndex((prev) => prev + 1);

    onInputWrongWord?.(input);

    resetInput();
  };

  const getNewBatch = () => {
    setCurrentWordIndex(0);
    setWordStatus({});

    loadNextBatch();

    resetInput();
  };

  const resetInput = () => setInput('');

  useEffect(() => {
    return () => loadNextBatch();
  }, []);

  useEffect(() => {
    if (!currentBatch) {
      return;
    }

    const inputHasSpace = input.endsWith(' ');

    if (!inputHasSpace) {
      return;
    }

    const inputWithoutSpace = input.trim();

    const isCorrectWord = inputWithoutSpace === currentBatch[currentWordIndex];

    if (!isCorrectWord) {
      return addWrongWord(currentBatch[currentWordIndex]);
    }

    return addCorrectWord(inputWithoutSpace);
  }, [input]);

  useEffect(() => {
    const isTheLastBatchWord = currentWordIndex === currentBatch.length;

    if (!isTheLastBatchWord) {
      return;
    }

    return getNewBatch();
  }, [input]);

  useEffect(() => {
    onInput?.(input);

    return () => {};
  }, [input]);

  return (
    <div className="container flex flex-col space-y-4 w-4/6" {...rest}>
      <div className="flex flex-wrap">
        {currentBatch.map((word, index) => (
          <p
            key={index}
            data-test="game-words"
            className={`text-2xl pl-2 ${
              wordsStatus[index] === 'correct'
                ? 'text-green-600'
                : wordsStatus[index] === 'wrong'
                  ? 'text-red-600'
                  : 'text-black'
            }`}
          >
            {word}
          </p>
        ))}
      </div>

      <div>
        <Input
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          list="autocompleteoff"
          spellCheck="false"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here....."
          className="text-2xl"
          data-test="game-input"
        />
      </div>
    </div>
  );
};
