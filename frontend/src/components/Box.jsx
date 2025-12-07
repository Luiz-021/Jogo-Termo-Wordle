import React from 'react';
import './Box.css'

function Box({value, state}) {
    const boxClass = `box ${state || ''}`;

    return (
        <div className={boxClass}>
            {value}
        </div>
    );

}

export default Box;