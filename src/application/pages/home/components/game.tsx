import { Input } from '@/application/components/ui/input';
import { useState, useEffect } from 'react';

interface IGame {
  words: string[];
  onInputCorrectWord?: (value: string) => void;
  onInputWrongWord?: (value: string) => void;
}

export const Game = ({
  words,
  onInputCorrectWord,
  onInputWrongWord,
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

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-4 self-center">
        {words.map((word) => {
          if (correctWords.includes(word)) {
            return (
              <p key={word} className="text-2xl  text-green-600">
                {word}
              </p>
            );
          }

          if (wrongWords.includes(word)) {
            return (
              <p key={word} className="text-2xl text-red-600">
                {word}
              </p>
            );
          }

          return (
            <p key={word} className="text-2xl text-black">
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
        />
      </div>
    </div>
  );
};
