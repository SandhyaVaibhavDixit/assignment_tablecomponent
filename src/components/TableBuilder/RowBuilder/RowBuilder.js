import React from 'react';
import { Input } from '../../UI/Input';
import { Select } from '../../UI/Select';
import { tableStructure } from '../../../_shared/tableStructure';
import { checkValidity } from '../../../_shared/utility';
import { selectOption } from '../../../_shared/selectOption';

import './RowBuilder.scss';

import DeleteIcon from '../../../assets/icons/delete.png';

export const RowBuilder = (props) => {
    const { rowData, onChange, onDelete } = props;

    const getElmentByType = (key, value, name, type) => {
        switch (type) {
            case 'select':
                return (
                    <Select
                        isValid     ={checkValidity(value, { required: true })}
                        value       ={value}
                        onChange     ={e => onChange(key, name, e)}
                        options     ={selectOption}
                    />
                )
            case 'input':
            case 'currency':
            default:
                return (
                    <Input
                        isValid     ={checkValidity(value, { required: true, isFloat: true })} 
                        inputType   ={type}
                        value       ={value}
                        onChange   ={e => onChange(key, name, e)} />
                );
        }
    }

    const rowContent =Object.keys(rowData).map((key, index) => {
        let element = null;
        if(key !== 'key'){
            const typeObject = tableStructure.filter(eachType => eachType.name === key);
            const type = typeObject !== undefined ? typeObject[0].inputType : 'currency';
            element =
            (
                <td key={index} >
                    {
                        getElmentByType(rowData.key, rowData[key], key, type)
                    }
                </td>);
        }
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
