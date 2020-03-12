import React from 'react';
import { Input } from '../../UI/Input';
import { Select } from '../../UI/Select';

import './RowBuilder.css';

import DeleteIcon from '../../../assets/icons/delete.png';

export const RowBuilder = (props) => {
    const { rowData, onChange, onDelete } = props;

    const getElmentByType = (column) => {
        switch (column.inputType) {
            case 'select':
                return (
                    <Select
                        value       ={column.value}
                        className   ="commonStyle"
                        name        ={column.name}
                        changed     ={e => onChange(e)}
                        options     ={column.options}
                    />
                )
            case 'input':
            case 'currency':
            default:
                return (
                    <Input
                        index       ={column.index}
                        isValid     ={column.isValid} 
                        name        ={column.name}
                        inputType   ={column.inputType}
                        value       ={column.value}
                        onChanged   ={e => onChange(e)} />
                );
        }
    }

    const rowContent = rowData.map(eachColumn => {
        return (
            <td key={eachColumn.name} >
                {getElmentByType(eachColumn)}
            </td>);
    });

    return (
        <tr key={rowData[0].rowKey}>
            {rowContent}
            <td>
                <button
                    className="imagebutton"
                    id={rowData[0].rowKey}
                    onClick={event => onDelete(event)}>

                    <img
                        id={rowData[0].rowKey}
                        src={DeleteIcon}
                        alt="Delete">
                    </img>
                </button>
            </td>
        </tr>
    );
}
