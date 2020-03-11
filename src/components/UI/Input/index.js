import React from 'react';
import classes from './index.css';

export const input = (props) => {
    const inputClasses = ['commonStyle'];
    console.log(props);
    if (!props.isValid) {
        inputClasses.push('Invalid');
    }

    const inputElement = <input
                            className   ={inputClasses.join(' ')}
                            value       ={props.inputType === 'currency' ? `$ ${props.value}` : props.value}
                            name        ={props.name}
                            inputtype   ={props.inputType}
                            onChange    ={props.changed} />;

    return (
        inputElement
    );
};

export default input;