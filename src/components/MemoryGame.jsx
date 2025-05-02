import { useState, useEffect } from 'react';
import { getAllCountries } from '../api/countries';

export default function MemoryGame() {
  const [countries, setCountries] = useState([]);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getAllCountries();
      const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, 8);
      setCountries(shuffled);
      // Create pairs for memory game
      const gameCards = [...shuffled, ...shuffled]
        .map((country, index) => ({ ...country, id: index }))
        .sort(() => 0.5 - Math.random());
      setCards(gameCards);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (solved.length > 0 && solved.length === countries.length) {
      setGameComplete(true);
    }
  }, [solved, countries.length]);

  const handleClick = (id) => {
    // Don't allow more than 2 cards flipped or already solved cards
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;
    
    setFlipped([...flipped, id]);
    setMoves(prev => prev + 1);
    
    // Check for match if two cards are flipped
    if (flipped.length === 1) {
      const firstCard = cards.find(card => card.id === flipped[0]);
      const secondCard = cards.find(card => card.id === id);
      
      if (firstCard.name.common === secondCard.name.common) {
        setSolved([...solved, firstCard.id, secondCard.id]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const resetGame = () => {
    const shuffled = [...countries].sort(() => 0.5 - Math.random()).slice(0, 8);
    const gameCards = [...shuffled, ...shuffled]
      .map((country, index) => ({ ...country, id: index }))
      .sort(() => 0.5 - Math.random());
    setCards(gameCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setGameComplete(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">Memory Game</h2>
      
      <div className="flex justify-between mb-4">
        <p className="text-lg">Moves: <span className="font-bold">{moves}</span></p>
        <p className="text-lg">Pairs found: <span className="font-bold">{solved.length / 2}</span>/8</p>
      </div>
      
      {gameComplete ? (
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold text-green-600 mb-4">🎉 Congratulations! 🎉</h3>
          <p className="text-lg mb-6">You completed the game in {moves} moves!</p>
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cards.map(card => (
            <div 
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 transform ${flipped.includes(card.id) || solved.includes(card.id) ? 'rotate-y-180' : ''} ${solved.includes(card.id) ? 'bg-green-200' : flipped.includes(card.id) ? 'bg-blue-200' : 'bg-indigo-200'}`}
            >
              {flipped.includes(card.id) || solved.includes(card.id) ? (
                <div className="text-center">
                  <img 
                    src={card.flags.svg} 
                    alt={card.name.common} 
                    className="h-20 mx-auto mb-2"
                  />
                  <p className="font-medium">{card.name.common}</p>
                </div>
              ) : (
                <span className="text-4xl">❓</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}