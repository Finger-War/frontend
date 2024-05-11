import { useState, useEffect } from 'react';

import { Input } from '@/presentation/components/ui/input';

interface IGame {
  words: string[];
  onInput?: (value: string) => void;
  onInputCorrectWord?: (value: string) => void;
  onInputWrongWord?: (value: string) => void;
  enoughWords?: () => void;
}

export const Game = ({
  words,
  onInput,
  onInputCorrectWord,
  onInputWrongWord,
  enoughWords,
  ...rest
}: IGame) => {
  const [input, setInput] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [wrongWords, setWrongWords] = useState<string[]>([]);

  const addCorrectWord = (input: string) => {
    setCorrectWords((prev) => [...prev, input]);
    setCurrentWordIndex((prev) => prev + 1);

    onInputCorrectWord?.(input);

    resetInput();
  };

  const addWrongWord = (input: string) => {
    setWrongWords((prev) => [...prev, input]);
    setCurrentWordIndex((prev) => prev + 1);

    onInputWrongWord?.(input);

    resetInput();
  };

  const resetInput = () => setInput('');

  useEffect(() => {
    if (!words) {
      return;
    }

    const inputHasSpace = input.endsWith(' ');

    if (!inputHasSpace) {
      return;
    }

    const inputWithoutSpace = input.trim();

    const isCorrectWord = inputWithoutSpace === words[currentWordIndex];

    if (!isCorrectWord) {
      return addWrongWord(words[currentWordIndex]);
    }

    return addCorrectWord(inputWithoutSpace);
  }, [input]);

  useEffect(() => {
    onInput?.(input);
  }, [input]);

  useEffect(() => {
    if (correctWords.length + wrongWords.length === words.length) {
      enoughWords?.();
    }

    return () => {};
  }, [correctWords, wrongWords]);

  return (
    <div className="flex flex-col space-y-4" {...rest}>
      <div className="flex flex-row space-x-4 self-center">
        {words.map((word) => {
          if (correctWords.includes(word)) {
            return (
              <p
                data-test="game-words"
                key={word}
                className="text-2xl  text-green-600"
              >
                {word}
              </p>
            );
          }

          if (wrongWords.includes(word)) {
            return (
              <p
                data-test="game-words"
                key={word}
                className="text-2xl text-red-600"
              >
                {word}
              </p>
            );
          }

          return (
            <p
              data-test="game-words"
              key={word}
              className="text-2xl text-black"
            >
              {word}
            </p>
          );
        })}
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
