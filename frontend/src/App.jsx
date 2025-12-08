import { useEffect, useState } from 'react';
import useWordle from './hooks/useWordle'; 
import './App.css';
import Board from './components/Board';

function App() {
  const [solution, setSolution] = useState(null);
  
  // Utilizando o Hook useWordle para gerenciar o estado do jogo.
  const { currentGuess, handleKeyup, guesses, isCorrect, turn } = useWordle(solution);

  useEffect(() => {
    const fetchWord = async () => {
      const res = await fetch('http://localhost:3001/api/words/');
      const json = await res.json();
      setSolution(json.word);
      console.log("Solução do jogo:", json.word);
    };
    fetchWord();
  }, [setSolution]);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    // Remover o listener caso usuário acertou ou acabaram as chances
    if (isCorrect || turn > 5) {
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div className="App">
      <h1>Termo Clone</h1>
      
      {isCorrect && <h3>Você Venceu!</h3>}
      
      {solution && (
        <div className="board-container">
          <Board 
            currentGuess={currentGuess} 
            guesses={guesses} 
            turn={turn} 
          />
        </div>
      )}
    </div>
  );
}

export default App;