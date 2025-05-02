import { useState, useEffect } from 'react';
import { getAllCountries } from '../api/countries';

export default function FlagQuiz() {
  const [countries, setCountries] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(-1);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getAllCountries();
      setCountries(data);
      if (data.length > 0) {
        generateQuestion(data);
      }
    };
    fetchCountries();
  }, []);

  const generateQuestion = (countryList) => {
    const shuffled = [...countryList].sort(() => 0.5 - Math.random());
    const correctAnswer = shuffled[0];
    const wrongAnswers = shuffled.slice(1, 4);
    
    setCurrentQuestion(correctAnswer);
    
    // Combine and shuffle options
    const allOptions = [correctAnswer, ...wrongAnswers]
      .sort(() => 0.5 - Math.random())
      .map(c => c.name.common);
    
    setOptions(allOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTotalQuestions(prev => prev + 1);
  };

  const handleAnswer = (answer) => {
    const correct = answer === currentQuestion.name.common;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    generateQuestion(countries);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">Flag Quiz</h2>
      
      <div className="text-center mb-4">
        <p className="text-lg">Score: <span className="font-bold">{score}/{totalQuestions}</span></p>
      </div>
      
      {currentQuestion && (
        <div className="space-y-6">
          <div className="flex justify-center">
            <img 
              src={currentQuestion.flags.svg} 
              alt="Guess this flag" 
              className="h-40 object-contain border-2 border-gray-200 rounded-lg shadow-sm"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {options.map((option, i) => (
              <button
                key={i}
                onClick={() => !selectedAnswer && handleAnswer(option)}
                disabled={!!selectedAnswer}
                className={`p-3 rounded-lg text-center font-medium transition-colors
                  ${!selectedAnswer ? 'bg-blue-100 hover:bg-blue-200' : ''}
                  ${selectedAnswer === option ? 
                    (isCorrect ? 'bg-green-200' : 'bg-red-200') : ''}
                  ${selectedAnswer && option === currentQuestion.name.common ? 'bg-green-200' : ''}
                `}
              >
                {option}
              </button>
            ))}
          </div>
          
          {selectedAnswer && (
            <div className="text-center">
              <p className={`text-lg font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? '✅ Correct!' : '❌ Incorrect!'}
              </p>
              <button
                onClick={nextQuestion}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}