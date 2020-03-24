import React, { useRef } from 'react';
import { Input } from '../../UI/Input';
import { Select } from '../../UI/Select';
import { CheckValidity } from '../../UI/CheckValidity';

import { tableStructure } from '../../../_shared/tableStructure';
import DeleteIcon from '../../../assets/icons/delete.png';

import './index.scss';

const inputTypes = ['input', 'currency'];

const extractNames = (acc, inputLine) => {
    if(inputTypes.includes(inputLine[1].inputType))
        return acc.concat(inputLine[1].name);
    else
        return acc;
}
const inputElementArray = Object.entries(tableStructure).reduce(extractNames, []);

export const RowBuilder = (props) => {
    const { rowData, options, onChange, onBlur, onDelete, emptyRowRef } = props;
        
    const inputRef =  useRef();
    const getElementByType = (rowData, name, inputType) => {
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
                const indexOfElement = inputElementArray.indexOf(name); 
                const isNewElementRef = (Boolean(isNew) && (indexOfElement === 0));
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

        const findInputType = tableStructure.find(eachInputType => eachInputType.name === key);
        const inputType = Boolean(findInputType) ? findInputType.inputType : 'currency';              
        
        const element =
                (
                    <td key={index} >
                        {
                            getElementByType(rowData, key, inputType)
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
                    onClick={() => onDelete(rowData.key)}>
                    <img
                         src ={DeleteIcon}
                        alt ="Delete">
                    </img>
                </button>
            </td>
        </tr>
    );
}
    