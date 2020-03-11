import React from 'react';

import './index.css'

export const select = (props) => {

    const selectElement = (
        <select
            value       = {props.value}
            className   ="commonStyle"
            name        = {props.name}
            onChange    = {props.changed}>

            {props.options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.displayValue}
                </option>
            ))}
            
        </select>
    );

    return (
        selectElement
    );
};


export default select;