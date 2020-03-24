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
    
    const renderTableRow = () => {
        const {key, isNew} = rowData;

        return Object.keys(rowData).map((columnName, index) => {
            if (columnName === 'key' || columnName === 'isNew') return false;

            const findInputType = tableStructure.find(eachInputType => eachInputType.name === columnName);
            const inputType = Boolean(findInputType) ? findInputType.inputType : 'currency';

            return renderColumn(rowData[columnName], columnName, inputType, key, isNew, index);
        });
    }

    const renderColumn = (value, columnName, inputType, rowKey, isNewRow, index) => {
        return(
                <td key={index}>
                    {
                       getColumnByType(value, columnName, inputType, rowKey, isNewRow)
                    }
                </td>
            );
    }

    const getColumnByType = (value, columnName, inputType, rowKey, isNew) => {
        switch (inputType) {
            case 'select':
                return (
                        <Select
                            isValid     ={CheckValidity(value, { required: true })}
                            value       ={value}
                            onChange    ={e => onChange(rowKey, columnName, e)}
                            options     ={options}
                        />
                    )
            case 'input':
            case 'currency':
            default:
                const isNewElementRef = (Boolean(isNew) && (firstInputElement.columnName === columnName) );
                const focusRef        = isNewElementRef ? inputRef : null;  
                return (
                        <Input
                            focus           ={focusRef}
                            name            ={columnName}
                            isValid         ={CheckValidity(value, { required: true, isFloat: true })} 
                            inputType       ={inputType}
                            value           ={value}
                            onChange        ={e => onChange(rowKey, columnName, e)} 
                            onBlur          ={() => onBlur(rowData)}
                        />
                    );
            }
    }

    const renderDeleteAction = (rowKey) =>{
        return(
            <button
                className="imagebutton"
                onClick={() => onDelete(rowKey)}>
                <img
                    src ={DeleteIcon}
                    alt ="Delete">
                </img>
            </button>
        )
    }

    return (
        <tr ref={emptyRowRef} key={rowData.key}>
                {renderTableRow()}
            <td>
                {renderDeleteAction(rowData.key)}
            </td>
        </tr>
    );
}
    