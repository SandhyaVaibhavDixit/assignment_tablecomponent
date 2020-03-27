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
        return tableStructure.map((eachColumn, index) => {
            const columnName = eachColumn.name;
        
            const data = {
                value       :rowData[columnName],
                columnName  :columnName,
                inputType   :eachColumn.inputType,
                key         :rowData.key,
                isNew       :Boolean(rowData.isNew) ? rowData.isNew : null,
                index       :index
            };

            return renderColumn(data);
        })
    }

    const renderColumn = (data) => {
        return(
                <td key={data.index}>
                    {
                       getColumnByType(data)
                    }
                </td>
            );
    }

    const getColumnByType = (data) => {
        const {value, columnName, inputType, key, isNew} = data;

        const onElementChange = (e) => onChange(key, e);
        switch (inputType) {
            case 'select':
                const isSelectValueValid = CheckValidity(value, { required: true });
                return (
                        <Select
                            isValid    ={isSelectValueValid}
                            name       ={columnName}
                            value      ={value}
                            onChange   ={onElementChange}
                            options    ={options}
                        />
                    )
            case 'input':
            case 'currency':
            default:
                const isNewElementRef   =(Boolean(isNew) && (firstInputElement.name === columnName) );
                const focusRef          =isNewElementRef ? inputRef : null;
                const isInputValueValid =CheckValidity(value, { required: true, isFloat: true })
                const onInputBlur       = () => onBlur(rowData);
                return (
                        <Input
                            focus     ={focusRef}
                            name      ={columnName}
                            isValid   ={isInputValueValid} 
                            inputType ={inputType}
                            value     ={value}
                            onChange  ={onElementChange} 
                            onBlur    ={onInputBlur}
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