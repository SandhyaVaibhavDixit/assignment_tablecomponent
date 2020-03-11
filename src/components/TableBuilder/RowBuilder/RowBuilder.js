import React from 'react';
import Input from '../../UI/Input/index';
import Select from '../../UI/Select/index';

import './RowBuilder.css';

import DeleteButtonImage from '../../../assets/icons/delete.png';

export const RowBuilder = (props) => {
    const { rowData, inputChangedHandler, deleteButtonClickeHandler } = props;

    const getElmentByType = (column) => {
        switch (column.inputType) {
            case 'input':
            case 'currency':
            default:
                return (
                    <Input
                        isValid     ={column.isValid} 
                        key         ={column.key}
                        name        ={column.name}
                        inputType ={column.inputType}
                        value       ={column.value}
                        changed     ={e => inputChangedHandler(e)} />
                );
            case 'select':
                return (
                    <Select
                        value       ={column.value}
                        className   ="commonStyle"
                        name        ={column.name}
                        changed     ={e => inputChangedHandler(e)}
                        options     ={column.options}
                    />
                )
        }
    }

    const rowContent = rowData.map(eachColumn => {
        return (
            <td key={eachColumn.name} >
                {getElmentByType(eachColumn)}
            </td>);
    });

    return (
        <tr key={rowData[0].key}>
            {rowContent}
            <td>
                <button
                    className="imagebutton"
                    id={rowData[0].key}
                    onClick={event => deleteButtonClickeHandler(event)}>

                    <img
                        id={rowData[0].key}
                        src={DeleteButtonImage}
                        alt="Delete">
                    </img>
                </button>
            </td>
        </tr>
    );
}
