import React from 'react';
import classes from './index.css';

export const Input = (props) => {
    const inputClasses = ['commonStyle'];

    if (!props.isValid) {
        inputClasses.push('Invalid');
    }

    const inputElement = <input
                            key         ={props.name}
                            name        ={props.name}
                            className   ={inputClasses.join(' ')}
                            value       ={props.inputType === 'currency' ? `$ ${props.value}` : props.value}
                            inputtype   ={props.inputType}
                            onChange    ={props.onChanged} />;

    return (
        inputElement
    );
};
