import { useState } from 'react';
import FlagQuiz from '../components/FlagQuiz';
import MemoryGame from '../components/MemoryGame';

export default function Games() {
  const [activeGame, setActiveGame] = useState('flag');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">Fun Learning Games</h1>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setActiveGame('flag')}
            className={`px-6 py-2 rounded-l-lg font-medium ${activeGame === 'flag' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-indigo-600'}`}
          >
            Flag Quiz
          </button>
          <button
            onClick={() => setActiveGame('memory')}
            className={`px-6 py-2 rounded-r-lg font-medium ${activeGame === 'memory' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-indigo-600'}`}
          >
            Memory Game
          </button>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {activeGame === 'flag' ? <FlagQuiz /> : <MemoryGame />}
      </div>
    </div>
  );
}