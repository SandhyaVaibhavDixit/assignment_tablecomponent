import React, { useRef } from 'react';
import { Input } from '../../UI/Input';
import { Select } from '../../UI/Select';
import { tableStructure } from '../../../_shared/tableStructure';
import { checkValidity } from '../../../_shared/utility';

import './RowBuilder.scss';

import DeleteIcon from '../../../assets/icons/delete.png';

export const RowBuilder = (props) => {
    const { rowData, options, onChange, onBlur, onDelete } = props;
    const inputRef =  useRef();

    const getElmentByType = (rowData, name, inputType, index) => {
        const { key, isNew } = rowData;
        const value          = rowData[name];
        switch (inputType) {
            case 'select':
                return (
                    <Select
                        isValid     ={checkValidity(value, { required: true })}
                        value       ={value}
                        onChange    ={e => onChange(key, name, e)}
                        options     ={options}
                    />
                )
            case 'input':
            case 'currency':
            default:
                const isNewElementRef = (Boolean(isNew) && index === 3);
                const focusRef        = isNewElementRef ? inputRef : null;  
                return (
                    <Input
                        focus           ={focusRef}
                        name            ={name}
                        isValid         ={checkValidity(value, { required: true, isFloat: true })} 
                        inputType       ={inputType}
                        value           ={value}
                        onChange        ={e => onChange(key, name, e)} 
                        onBlur          ={() => onBlur(rowData)}
                    />
                );
           }
    }

    const rowContent =Object.keys(rowData).map((key, index) => {
        if (key === 'key' || key === 'isNew') return false;

        let element = null;
        const findInputType = tableStructure.find(eachInputType => eachInputType.name === key);
        const inputType = Boolean(findInputType) ? findInputType.inputType : 'currency';              
        element =
        (
            <td key={index} >
                {
                    getElmentByType(rowData, key, inputType, index)
                }
            </td>
        );
        return element;
    });

    return (
        <tr key={rowData.key}>
            {rowContent}
            <td>
                <button
                    className="imagebutton"
                    onClick={e => onDelete(e, rowData.key)}>

                    <img
                        src={DeleteIcon}
                        alt="Delete">
                    </img>
                </button>
            </td>
        </tr>
    );
}
    