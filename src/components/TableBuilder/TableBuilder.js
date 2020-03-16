import React, { useState } from 'react';
import { RowBuilder } from './RowBuilder/RowBuilder';
import { tableStructure } from '../../_shared/tableStructure';
import { selectOption } from '../../_shared/selectOption';

import './TableBuilder.scss';
import AddButtonImage from '../../assets/icons/plus.png';

export const TableBuilder = () => {
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
    const [state, setState] = useState(initialData);

    const getTableHeader = (tableStructure) => {
        const header = tableStructure.map(header => header.text);
        return header;
    }

    const generatKey = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    const onAddItem = () => {
        const emptyState = tableStructure.reduce((object, column) => {
            if ( column.inputType === 'select' ) {
                object[column.name] = '';
            }
            else {
                object[column.name] = 0;
            }
            
            return object;
        }, {});

        setState([
            {...emptyState, key: generatKey(1, 100) },
            ...state
        ]);
        //setState(state.concat([emptyState]));
    }

    const onChange = (key, name, e) => {
        // e.preventDefault();
        const {value} = e.target;

        //Copy state.
        const currentState = [...state];
        
        let updateItem = currentState.find(item => item.key === key);

        // const selectedItem = currentState.reduce((object, eachItem) => {
        //     if(eachItem.key === key){
        //         object = eachItem;    
        //     }
        //     return object;
        // },{});

        // selectedItem[name] = value;

        updateItem[name]= value;

        //Update state.
        setState([...currentState]);
    };

    const onDelete = (e, key) => {
        //Copy state.
        const currentState = [...state];

        //Remove by filter.
        setState(currentState.filter(item => item.key !== key));
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
            <RowBuilder key={eachTableRow.key} rowData={eachTableRow} options={selectOption} onChange={onChange} onDelete={onDelete} />
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

