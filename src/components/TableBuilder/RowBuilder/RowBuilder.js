import React from 'react';
import { Input } from '../../UI/Input';
import { Select } from '../../UI/Select';
import { tableStructure } from '../../../_shared/tableStructure';
import { checkValidity } from '../../../_shared/utility';
import { selectOption } from '../../../_shared/selectOption';

import './RowBuilder.scss';

import DeleteIcon from '../../../assets/icons/delete.png';

export const RowBuilder = (props) => {
    const { id, rowData, onChange, onDelete } = props;

    const getElmentByType = (columnName, index, value, type) => {
        switch (type) {
            case 'select':
                return (
                    <Select
                        value       ={value}
                        className   ="commonStyle"
                        name        ={columnName}
                        isValid     ={checkValidity(value, { required: true })}
                        index       ={index}
                        changed     ={e => onChange(e, id)}
                        options     ={selectOption}
                    />
                )
            case 'input':
            case 'currency':
            default:
                return (
                    <Input
                        index       ={index}
                        isValid     ={checkValidity(value, { required: true, isFloat: true })} 
                        name        ={columnName}
                        inputType   ={type}
                        value       ={value}
                        onChanged   ={e => onChange(e, id)} />
                );
        }
    }

    const rowContent =Object.keys(rowData).map((key, index) => {
        const typeObject = tableStructure.filter(eachType => eachType.name === key);
        const type = typeObject !== undefined ? typeObject[0].inputType : 'currency';
 
        return (
            <td key={index} >
                {
                    getElmentByType(key, index, rowData[key], type)
                }
            </td>);
    });

    return (
        <tr key={id}>
            {rowContent}
            <td>
                <button
                    id={id}
                    className="imagebutton"
                    onClick={event => onDelete(event)}>

                    <img
                        id={id}
                        src={DeleteIcon}
                        alt="Delete">
                    </img>
                </button>
            </td>
        </tr>
    );
}
