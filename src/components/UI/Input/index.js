import React, { useRef, useEffect } from 'react';
import './index.scss';

export const Input = (props) => {
    const { currentRowKey, newRowKey, columnIndex, isValid, inputType, value, onChange } = props;

    const inputClasses = ['input'];
    const spanClasses = ['prefix'];

    if (!isValid) {
        inputClasses.push('invalid');
        spanClasses.push('invalid');
    }

    const inputRef =  useRef(null);

    useEffect(() => {
        if ((newRowKey !== null) && (currentRowKey === newRowKey) && (columnIndex === 2)) //to focus to first element of added row.
        {
            if( inputRef.current !== null ){
                inputRef.current.focus();
                
            }
        }
    });

    const inputElement =<div>
                        {(inputType === 'currency')? <span className={spanClasses.join(' ')}>$</span> : ''}
                        <input
                            ref         = {inputRef}
                            className   = {inputClasses.join(' ')}
                            type        = 'text'
                            value       = {value}
                            onChange    = {onChange} />
                    </div> 
    
    return (
        inputElement
    );
};
