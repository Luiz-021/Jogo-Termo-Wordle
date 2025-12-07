import React from 'react';
import Box from './Box';
import './Row.css';

function Row({ guess = "" }) {
    
  const splitGuess = guess.split(''); 
  
  return (
    <div className="row">
      {[0, 1, 2, 3, 4].map((i) => (
        <Box key={i} value={splitGuess[i]} />
      ))}
    </div>
  );
}

export default Row;