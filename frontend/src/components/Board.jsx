import React from 'react';
import Row from './Row';

function Board({ guesses}){
    return(
        <div classname = "board">
            {[0,1,2,3,4,5].map((i) => (
                <Row key = {i} guess = {guesses[i]} />
                ))}
        </div>
    );
}

export default Board;