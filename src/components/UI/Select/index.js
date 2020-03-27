import React from 'react';
import './index.scss'

export const Select = (props) => {
    const { isValid, name, value, onChange, options } = props;
    const selectClasses = ['select'];

    if (!isValid) {
        selectClasses.push('invalid');
    }
    const optionElement = options.map(option => (
                                <option 
                                    key   ={option.value} 
                                    value ={option.value}>
                                        {option.text}
                                </option>
                            ));
    const selectElement = (
        <select
            value     ={value}
            name      ={name}
            className ={selectClasses.join(' ')}
            onChange  ={onChange}>
            { optionElement }
        </select>
    );

    return (
        selectElement
    );
};
