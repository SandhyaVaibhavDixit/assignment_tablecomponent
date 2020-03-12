import React from 'react';

import './index.scss'

export const Select = (props) => {

    const selectElement = (
        <select
            value       = {props.value}
            className   = 'commonStyle'
            key         = {props.name}
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
