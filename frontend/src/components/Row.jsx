import React from 'react';
import Box from './Box';
import './Row.css';

function Row({ guess, currentGuess }) {

  if (guess) {
    return (
      <div className="row past">
        {guess.map((l, i) => (
          <Box key={i} value={l.key} color={l.color} />
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split('');

    return (
      <div className="row current">
        {letters.map((letter, i) => (
          <Box key={i} value={letter} />
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <Box key={i} value="" />
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {[...Array(5)].map((_, i) => (
        <Box key={i} value="" />
      ))}
    </div>
  );
}

export default Row;