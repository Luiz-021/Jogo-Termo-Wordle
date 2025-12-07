import './App.css';
import {useState} from 'react';
import Board from './components/Board';

function App() {

  const [guesses, setGuesses] = useState(Array(6).fill(null));

  //const [guesses, setGuesses] = useState(["TESTE", "TERMO", "CLONE", null, null, null]);
  return (
    <div className="App">
      <h1>Termo Clone</h1>
    
      <div className="board-container">
        <Board guesses={guesses} />
      </div>

    </div>
  );
}

export default App;