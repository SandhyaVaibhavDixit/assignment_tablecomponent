import React, { useEffect } from 'react';
import './index.scss';

export const Input = (props) => {
    const { focus, isValid, inputType, value, onChange, onBlur } = props;

    const inputClasses = ['input'];
    const spanClasses = ['prefix'];

    if (!isValid) {
        inputClasses.push('invalid');
        spanClasses.push('invalid');
    }

    //focusFirstInputElementForNewRow gives following error:
    //Line 18:9:  React Hook "useEffect" is called in function "focusFirstInputElementForNewRow" which is neither a React function component or a custom React Hook function  react-hooks/rules-of-hooks
    //So renamed it as FocusFirstInputElementForNewRow
    const FocusFirstInputElementForNewRow = () => {
        useEffect(() => {
            if (focus) {
                focus.current.focus();              
            }
        });    
    }

    FocusFirstInputElementForNewRow();
    const span = (inputType === 'currency') ? <span className={spanClasses.join(' ')}>$</span> : '';
    const inputElement = <div>
                         {span}
                         <input
                            ref       ={focus}
                            className ={inputClasses.join(' ')}
                            type      ='text'
                            value     ={value}
                            onChange  ={onChange}
                            onBlur    ={onBlur}
                         />
                    </div> 
    
    return (
        inputElement
    );
};
