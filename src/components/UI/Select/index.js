import React from 'react';

import './index.scss'

export const Select = (props) => {
    const { isValid, value, onChange, options } = props;

    const selectClasses = ['select'];

    if (!isValid) {
        selectClasses.push('invalid');
    }

    const selectElement = (
        <select
            value       = {value}
            className   = {selectClasses.join(' ')}
            onChange    = {onChange}>

            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.text}
                </option>
            ))}
            
        </select>
    );

    return (
        selectElement
    );
};
