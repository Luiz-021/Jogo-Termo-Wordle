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

        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                l.color = 'green';
                solutionArray[i] = null; 
            }
        });

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
            newGuesses[turn] = formattedGuess; 
            return newGuesses;
        });

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        });

        setTurn((prevTurn) => prevTurn + 1);
        setCurrentGuess('');
    };

    const validateWord = async (word) =>{
        try{
            const res = await fetch('http://localhost:3001/api/words/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ word: word })
            });

            if (!res.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            
            const data = await res.json();
            return data.isValid;
        }   catch(error){
            console.error("Erro ao validar:", error);
            return false;
        }
    }

    const handleKeyup = async ({ key }) => {
        if (key === 'Enter') {
            if (turn > 5) return;
            if (history.includes(currentGuess)) return;
            if (currentGuess.length !== 5) return;

            const isValid = await validateWord(currentGuess);

            if(!isValid){
                console.log("Palavra inválida");
                return;
            }

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