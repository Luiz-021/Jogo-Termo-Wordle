import React from 'react';
import Box from './Box';
import './Row.css';

function Row({ guess }) {

  if (guess) {
    return (
      <div className="row past">
        {guess.map((l, i) => (
          <Box key={i} value={l.key} color={l.color} />
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