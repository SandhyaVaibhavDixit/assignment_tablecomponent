import React, { useRef } from 'react';
import { Input } from '../../UI/Input';
import { Select } from '../../UI/Select';
import { CheckValidity } from '../../UI/Utility/utility';

import { tableStructure } from '../../../_shared/tableStructure';
import DeleteIcon from '../../../assets/icons/delete.png';

import './index.scss';

export const RowBuilder = (props) => {
    const { rowData, options, onChange, onBlur, onDelete, emptyRowRef } = props;
    const inputRef =  useRef();
    let inputElementCount = 0;

    const getElementByType = (rowData, name, inputType, index) => {
        const { key, isNew } = rowData;
        const value          = rowData[name];
        switch (inputType) {
            case 'select':
                return (
                    <Select
                        isValid     ={CheckValidity(value, { required: true })}
                        value       ={value}
                        onChange    ={e => onChange(key, name, e)}
                        options     ={options}
                    />
                )
            case 'input':
            case 'currency':
            default:
                inputElementCount++;
                const isNewElementRef = (Boolean(isNew) && (inputElementCount === 1));
                const focusRef        = isNewElementRef ? inputRef : null;  
                return (
                    <Input
                        focus           ={focusRef}
                        name            ={name}
                        isValid         ={CheckValidity(value, { required: true, isFloat: true })} 
                        inputType       ={inputType}
                        value           ={value}
                        onChange        ={e => onChange(key, name, e)} 
                        onBlur          ={() => onBlur(rowData)}
                    />
                );
           }
    }

    const rowContent = Object.keys(rowData).map((key, index) => {
        if (key === 'key' || key === 'isNew') return false;

        let element = null;
        const findInputType = tableStructure.find(eachInputType => eachInputType.name === key);
        const inputType = Boolean(findInputType) ? findInputType.inputType : 'currency';              
        element =
                (
                    <td key={index} >
                        {
                            getElementByType(rowData, key, inputType, index)
                        }
                    </td>
                );
        return element;
    });


    return (
        <tr ref={emptyRowRef} key={rowData.key}>
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
    