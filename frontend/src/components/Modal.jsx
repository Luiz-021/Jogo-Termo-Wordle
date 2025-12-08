import React from 'react';
import './Modal.css';

export default function Modal({isCorrect, turn, solution, resetGame}) {
    
    const handleClick = () => {
        resetGame();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                {isCorrect && (
                    <div>
                        <h1>Você Venceu!</h1>
                        <p className="solution">{solution}</p>
                        <p>Você acertou em {turn} tentativas.</p>
                        <button onClick={handleClick} className="play-again-button"> Jogar novamente</button>
                    </div>
                )}
                {!isCorrect && (
                    <div>
                        <h1>Fim de jogo</h1>
                        <p className="solution">{solution}</p>
                        <p>Não foi dessa vez...</p>
                        <button onClick={handleClick} className="play-again-button">Tentar Outra Palavra</button>
                    </div>
                )}
            </div>
        </div>
    );
}