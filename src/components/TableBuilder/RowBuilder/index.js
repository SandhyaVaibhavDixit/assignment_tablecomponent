import React, { useRef } from 'react';
import { Input } from '../../UI/Input';
import { Select } from '../../UI/Select';
import { CheckValidity } from '../../../_util/checkValidity';
import { findInputElement } from '../../../_util/findFirstInput';
import DeleteIcon from '../../../assets/icons/delete.png';

import './index.scss';

export const RowBuilder = (props) => {
    const { tableStructure, rowData, options, onChange, onBlur, onDelete, emptyRowRef } = props;
    const firstInputElement = findInputElement(tableStructure);

    const inputRef =  useRef();
    
    const getColumnByType = (rowData, name, inputType) => {
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
                const isNewElementRef = (Boolean(isNew) && (firstInputElement.name === name) );
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

    const renderDeleteAction = () =>{
        return(
            <button
                className="imagebutton"
                onClick={() => onDelete(rowData.key)}>
                <img
                    src ={DeleteIcon}
                    alt ="Delete">
                </img>
            </button>
        )
    }

    const renderColumn = (index, rowData, key, inputType) => {
        return(
                <td key={index} >
                    {
                        getColumnByType(rowData, key, inputType)
                    }
                </td>
            );
    }
    
    const renderTableRow = () => {
        return Object.keys(rowData).map((key, index) => {
            if (key === 'key' || key === 'isNew') return false;

            const findInputType = tableStructure.find(eachInputType => eachInputType.name === key);
            const inputType = Boolean(findInputType) ? findInputType.inputType : 'currency';
            
            return renderColumn(index, rowData, key, inputType);
        });
    }

    return (
        <tr ref={emptyRowRef} key={rowData.key}>
            {renderTableRow()}
            <td>
                {renderDeleteAction()}
            </td>
        </tr>
    );
}
    