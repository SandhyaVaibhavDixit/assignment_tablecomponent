import React, { useState } from 'react';
import { RowBuilder } from './RowBuilder/RowBuilder';

const TableBuilder = props => {
    const initialState = [
        {
            materialFee: 10.00,
            item: 'value',
            packingFee: 2.00,
            unpackingFee: 3.00
        },
        {
            materialFee: 2.00,
            item: 'value 1',
            packingFee: 1.00,
            unpackingFee: 4.00
        },
        {
            materialFee: 2.00,
            item: 'value 2',
            packingFee: 1.00,
            unpackingFee: 5.00
        },
    ];
    const columns = props.tableStructure;
    let row = 0;
    const columnData = initialState.map((eachData) => {
        row++;
        let columnCnt = 0;
        const check = columns.map((column) => {
            columnCnt++;
            return {
                ...column,
                key: "row" + row,
                name: "row" + row + "Col" + columnCnt,
                value: eachData[column.name]
            }
        });
        return check;
    });

    const [state, setState] = useState(columnData);

    const getHeader = (tableStructure) => {
        const header = tableStructure.map(header => header.text);
        return header;  
    }

    const addItemClickHandler = () => {
        let rowNo = Math.floor(Math.random() * 100); //state.length;
        let columnCnt = 0;
        const emptyState = columns.map((column) => {
            columnCnt++;
            return {
                ...column,
                key: "row" + rowNo,
                name: "row" + rowNo + "Col" + columnCnt,
                value: ''
            }
        });

        setState(state.concat([emptyState]));
    }

    const inputChangedHandler = (event) => {
        const value = event.target.value.replace('$', '').trim();

        //Copy state.
        let currentState = state;

        currentState = currentState.map(eachObject => {
            return eachObject.map(eachData => (eachData.name === event.target.name ? { ...eachData, value } : eachData))
        });

        //Update state.
        setState(currentState);
    };

    const deleteButtonClickeHandler = (event) => {
        //Derive row to be deleted.
        const rowId = event.target.id;

        //Copy state.
        let currentState = state;

        currentState = currentState.filter(eachObject => (eachObject[0].key !== rowId));

        //Update state.
        setState(currentState);
    }

    return (
        <div>
            <table>
                <thead>
                    <RowBuilder columnHeader={getHeader(props.tableStructure)} />
                </thead>
                <tbody>
                    <RowBuilder columnData={state} inputChangedHandler={inputChangedHandler} deleteButtonClickeHandler={deleteButtonClickeHandler} />
                </tbody>
            </table>
            <button onClick={addItemClickHandler}> Add Item</button>
        </div>
    );
};

export default TableBuilder;