import React, { useState } from 'react';
import { RowBuilder } from './RowBuilder/RowBuilder';
import { tableStructure } from '../../_shared/tableStructure';

import './TableBuilder.scss';
import AddButtonImage from '../../assets/icons/plus.png';

const TableBuilder = () => {
    const initialData = [
        {
            key: 1,
            item: 'tape',
            materialFee: 10.00,
            packingFee: 2.00,
            unpackingFee: 3.00
        },
        {
            key: 2,
            item: 'tape',
            materialFee: 2.00,
            packingFee: 1.00,
            unpackingFee: 4.00
        },
        {
            key: 3,
            item: 'cd',
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

    function generatRandomKey(min, max) {
        return Math.random() * (max - min) + min;
      }

    const onAddItem = () => {
        const emptyState = columns.reduce((object, column) => {
            if ( column.inputType === 'select' ) {
                object[column.name] = '';
            }
            else {
                object[column.name] = 0;
            }
            
            return object;
        }, {});

        setState([
            {...emptyState, key: generatRandomKey(1, 100) },
            ...state
        ]);
        //setState(state.concat([emptyState]));
    }

    const onChange = (key, name, e) => {
        // e.preventDefault();
        let {value, type} = e.target;

        let enteredValue = (type === 'text') ? 
                                value.replace('$', '').trim() : 
                                value;

        //Copy state.
        const currentState = [...state];
        
        let updateItem = currentState.find(item => item.key === key);

        updateItem[name]= enteredValue;

        //currentState = [...currentState, updateItem]; 

        //Update state.
        setState([...currentState]);
    };

    const onDelete = (e, key) => {
        //Copy state.
        const currentState = [...state];

        //Find item to be deleted.
        const updateItem = currentState.find(item => item.key === key);

        currentState.splice(updateItem[key], 1);

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
            <RowBuilder key={eachTableRow.key} rowData={eachTableRow} onChange={onChange} onDelete={onDelete} />
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