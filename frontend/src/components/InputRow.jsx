import React from 'react';
import './InputRow.css';

export default function InputRow({ currentGuess}) {
    const letters = currentGuess.split('');

    return (
        <div className = "input-row">
            {[0,1,2,3,4].map((i) => (
                <div key={i} className = "input-slot">
                    <span className={letters[i] ? "letter filled" : "letter empty"}>
                        {letters[i] ? letters[i] : "_"}
                    </span>
                </div>
            ))}
        </div>
    );
}