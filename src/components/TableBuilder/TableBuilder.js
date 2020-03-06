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
        const header = tableStructure.map(header => header.name);
        return header;
    }

    const addItemClickHandler = () => {
        let rowCnt = state.length;
        let columnCnt = 0;
        const emptyState = columns.map((column) => {
            rowCnt++;
            columnCnt++;
            return {
                ...column,
                key: "row" + rowCnt,
                name: "row" + rowCnt + "Col" + columnCnt,
                value: ''
            }
        });

        setState(state.concat([emptyState]));
    }

    const inputChangedHandler = (event) => {
        const value = event.target.value.replace('$', '').trim();

        //Copy state.
        let currentData = state;
        
        currentData = currentData.map(eachObject => {
            return eachObject.map(eachData => (eachData.name === event.target.name ? { ...eachData, value } : eachData))
        });

        //Update state.
        setState(currentData);
    };

    return (
        <div>
            <table>
                <thead>
                    {/* render header */}
                    <RowBuilder columnHeader={getHeader(props.tableStructure)} />
                </thead>
                <tbody>
                    <RowBuilder columnData={state} inputChangedHandler={inputChangedHandler} />
                </tbody>
            </table>
            <button onClick={addItemClickHandler}> Add Item</button>
        </div>
    );
};

export default TableBuilder;