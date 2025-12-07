import { useState } from 'react';

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);

    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: 'grey' };
        });

        // Passo 1: Encontrar letras verdes
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                l.color = 'green';
                // CORREÇÃO LÓGICA AQUI:
                // Antes estava: solutionArray = null; (Apagava o array todo)
                // Correto: Anula só a posição atual para não contar duplicado
                solutionArray[i] = null; 
            }
        });

        // Passo 2: Encontrar letras amarelas
        formattedGuess.forEach((l, i) => {
            if (l.color !== 'green' && solutionArray.includes(l.key)) {
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        });

        return formattedGuess;
    };

    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }

        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            // CORREÇÃO DE SINTAXE AQUI:
            // Antes estava: newGuesses(turn) = ... (Parênteses)
            // Correto: Usa colchetes para acessar o índice do array
            newGuesses[turn] = formattedGuess; 
            return newGuesses;
        });

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        });

        setTurn((prevTurn) => prevTurn + 1);
        setCurrentGuess('');
    };

    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            if (turn > 5) return;
            if (history.includes(currentGuess)) return;
            if (currentGuess.length !== 5) return;

            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => prev.slice(0, -1));
            return;
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => prev + key.toUpperCase());
            }
        }
    };

    return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;