import React from 'react';
import Row from './Row';

function Board({ guesses, turn}){
    return(
        <div className = "board">
            {guesses.map((g, i) => {
                return <Row key={i} guess={g} />;
            })}
        </div>
    );
}

export default Board;