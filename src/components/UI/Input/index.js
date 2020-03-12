import React, { useRef, useEffect } from 'react';
import './index.css';

export const Input = (props) => {
    const inputClasses = ['commonStyle'];

    if (!props.isValid) {
        inputClasses.push('Invalid');
    }
    const inputRef =  useRef(null);

    useEffect(() => {
        if (props.index === 2) //to focus to first element of added row.
        {
            if( inputRef.current !== null ){
                inputRef.current.focus();
                
            }
        }
    });

    const inputElement = <input
                            ref         = {inputRef}
                            key         = {props.name}
                            name        = {props.name}
                            className   = {inputClasses.join(' ')}
                            value       = {props.inputType === 'currency' ? `$ ${props.value}` : props.value}
                            inputtype   = {props.inputType}
                            onChange    = {props.onChanged} />;

    return (
        inputElement
    );
};
