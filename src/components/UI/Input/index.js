import React, { useRef, useEffect } from 'react';
import './index.scss';

export const Input = (props) => {
    const { isValid, inputType, value, onChange } = props;

    const inputClasses = ['commonStyle'];

    if (!isValid) {
        inputClasses.push('Invalid');
    }
    const inputRef =  useRef(null);

    useEffect(() => {
        if (props.index === 1) //to focus to first element of added row.
        {
            if( inputRef.current !== null ){
                inputRef.current.focus();
                
            }
        }
    });

    const inputElement = <input
                            ref         = {inputRef}
                            className   = {inputClasses.join(' ')}
                            value       = {inputType === 'currency' ? `$ ${value}` : value}
                            inputtype   = {inputType}
                            onChange    = {onChange} />;

    return (
        inputElement
    );
};
