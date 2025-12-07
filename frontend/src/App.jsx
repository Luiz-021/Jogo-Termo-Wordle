import './App.css';
import {useState, useEffect} from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  //Histórico de tentativas do jogador
  const [guesses, setGuesses] = useState(Array(6).fill(null));

  //Tentativa que está sendo digitado agora
  const [currentGuess, setCurrentGuess] = useState('');

  //Qual a tentativa atual (de 0 a 5)
  const [turn, setTurn] = useState(0);

  //Palavra secreta
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/words/word-of-the-day');
        const json = await res.json();

        console.log("Solução recebida: ", json);
        setSolution(json.word);

      } catch(error){
        console.error("Erro ao buscar a palavra secreta: ", error);
      }
    };
    fetchWord();
  }, []); 

  useEffect(() => {
    const handleKeyup = (event) =>{
      const key = event.key;

      if (key === 'Enter'){
        if(currentGuess.length !== 5) return;
        console.log("Palavra Enviada: ", currentGuess);

        const newGuesses = [...guesses];
        newGuesses[turn] = currentGuess;
        setGuesses(newGuesses);
        setTurn((prevTurn) => prevTurn + 1);
        setCurrentGuess('');
      }

      if (key === 'Backspace'){
        setCurrentGuess((prev) => prev.slice(0,-1));
        return;
      }

      if (/^[A-Za-z]$/.test(key)){  
        if (currentGuess.length < 5){
          setCurrentGuess((prev) => prev + key.toUpperCase());
        }
      }
    };

    window.addEventListener('keyup', handleKeyup);

    return () => window.removeEventListener('keyup', handleKeyup);

  }, [currentGuess, guesses, turn]);

  return (
    <div className="App">
      <h1>Termo Clone</h1>

      {solution && <p>Solução: {solution}</p>}

      <div className="board-container">
        <Board guesses={guesses.map((g,i) =>{
          if (i === turn) return currentGuess;
          return g;
        })} />
      </div>

    </div>
  );
}

export default App;