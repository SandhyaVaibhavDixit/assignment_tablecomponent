import React, { useState } from 'react';
import { RowBuilder } from './RowBuilder/RowBuilder';
import { tableStructure } from '../../_shared/tableStructure';

import './TableBuilder.scss';
import AddButtonImage from '../../assets/icons/plus.png';

const TableBuilder = props => {
    const initialData = [
        {
            item: '',
            materialFee: 10.00,
            packingFee: 2.00,
            unpackingFee: 3.00
        },
        {
            item: '',
            materialFee: 2.00,
            packingFee: 1.00,
            unpackingFee: 4.00
        },
        {
            item: '',
            materialFee: 2.00,
            packingFee: 1.00,
            unpackingFee: 5.00
        },
    ];

    const columns = tableStructure;

    const [state, setState] = useState(initialData);

    const getTableHeader = (tableStructure) => {
        const header = tableStructure.map(header => header.text);
        return header;
    }

    const onAddItem = () => {
        const emptyState = columns.reduce((object, column) => {
            if(column.inputType === 'select'){
                object[column.name] = '';
            }else{
                object[column.name] = 0;
            }
            
            return object;
        }, {});

        setState(state.concat([emptyState]));
    }

    const onChange = index => e => {
        e.preventDefault();
        let {name, value, type} = e.target;

        let enteredValue = (type === 'text') ? 
                                value.replace('$', '').trim() : 
                                value;

        //Copy state.
        const currentState = [...state];
        
        currentState[index]  ={...currentState[index], [name]: enteredValue };

        //Update state.
        setState(currentState);
    };

    const onDelete = index => e => {
        //Copy state.
        const currentState = [...state];

        currentState.splice(index, 1);

        //Update state.
        setState(currentState);
    }

    const headerData = getTableHeader(tableStructure);

    const tableHeaderRenderer = headerData.map(eachcolumn => {
        return (
            <td key={eachcolumn}>
                <b>{eachcolumn}</b>
            </td>
        );
    });

    const tableRowData = [...state];
    const tableBodyRenderer = tableRowData.map((eachTableRow, index) => {
        return (
            <RowBuilder id={index} key={index} rowData={eachTableRow} onChange={onChange(index)} onDelete={onDelete(index)} />
        )
    })

    return (
        <div>
            <table className="Table">
                <thead>
                    <tr>
                        {tableHeaderRenderer}
                    </tr>
                </thead>
                <tbody>
                    {tableBodyRenderer}
                </tbody>
            </table>
            <button className="imagebutton" onClick={onAddItem}>
                <img src={AddButtonImage} alt="Add"></img>
                <span>Add Item</span>
            </button>
        </div>
    );
};

export default TableBuilder;