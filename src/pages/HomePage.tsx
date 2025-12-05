import React, { useState } from 'react';
import { generateSlug } from 'random-word-slugs';
import { PaperH1Title, PaperLink, PaperPage, PaperSelectBox } from '../components/PaperComponents';

type Difficulty = 'easy' | 'medium' | 'hard';

export default function HomePage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(event.target.value as Difficulty);
  };

  const generateGamePath = (): string => {
    return `/${generateSlug()}/?difficulty=${difficulty}`;
  };

  return (
    <PaperPage>
      <PaperH1Title>Welcome to Mine Sweeper</PaperH1Title>

      <div className="mb-6">
        <label htmlFor="difficulty-select" className="block text-xl font-bold mb-2">
          Select Difficulty
        </label>

        <PaperSelectBox
          id="difficulty-select"
          defaultValue={difficulty}
          onChange={handleDifficultyChange}
          className="max-w-xs"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </PaperSelectBox>
      </div>

      <p className="mt-8">
        {/* The PaperLink's 'to' prop is now dynamic, ensuring the selected difficulty is used. */}
        <PaperLink to={generateGamePath()} variant="primary">
          Start New Game
        </PaperLink>
      </p>
    </PaperPage>
  );
}
