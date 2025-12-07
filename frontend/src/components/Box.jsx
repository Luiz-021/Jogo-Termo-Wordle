import React from 'react';
import './Box.css'

function Box({value, color}) {
    const boxClass = `box ${color || ''}`;

    return (
        <div className={boxClass}>
        {value}
        </div>
    );

}

export default Box;