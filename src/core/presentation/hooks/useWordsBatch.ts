import { useState } from 'react';

export const UseWordsBatch = (words: string[], batchSize: number) => {
  const [currentBatch, setCurrentBatch] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadNextBatch = () => {
    const nextBatch = words.slice(currentIndex, currentIndex + batchSize);

    setCurrentBatch(nextBatch);

    setCurrentIndex((prev) => prev + batchSize);
  };

  return { currentBatch, loadNextBatch };
};
