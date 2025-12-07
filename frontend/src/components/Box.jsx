import React from 'react';
import './Box.css'

function Box({value, color}) {
    const isFilled = !color && value ? 'filled' : '';
    const boxClass = `box ${color || ''} ${isFilled}`;

    return (
        <div className={boxClass}>
        {value}
        </div>
    );

}

export default Box;