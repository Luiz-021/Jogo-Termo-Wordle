import { useEffect, useState } from 'react';
import useWordle from './hooks/useWordle'; 
import './App.css';
import Board from './components/Board';
import Modal from './components/Modal';
import InputRow from './components/InputRow';

function App() {
  const [solution, setSolution] = useState(null);
  
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, resetGame } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  const fetchWord = async () => {
      const res = await fetch('http://localhost:3001/api/words/');
      const json = await res.json();
      setSolution(json.word);
      console.log("Solução do jogo:", json.word);
    };

  useEffect(() => {
    fetchWord();
  }, []);

  useEffect(() => {
    if (isCorrect || turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
    }
  }, [isCorrect, turn]);

  useEffect(() => {
    if (isCorrect || turn > 5) {
        return; 
    }

    window.addEventListener('keyup', handleKeyup);

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  const handleRestart = () => {
    setShowModal(false);
    resetGame();
    setSolution(null);
    fetchWord();
  };

  return (
    <div className="App">
      <h1>Termo Clone</h1>

      <InputRow currentGuess={currentGuess} />
      
      {solution && (
        <div className="board-container">
          <Board guesses={guesses} turn={turn} />
        </div>
      )}

      {showModal && (
        <Modal 
          isCorrect={isCorrect} 
          turn={turn} 
          solution={solution} 
          resetGame={handleRestart} 
        />
      )}
    </div>
  );
}

export default App;