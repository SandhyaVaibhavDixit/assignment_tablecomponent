import React, { useState } from 'react';
import { RowBuilder } from './RowBuilder/RowBuilder';
import './TableBuilder.css';

import AddButtonImage from '../../assets/icons/plus.png';

const TableBuilder = props => {
    const itemSelectOptions = [
        {value: 'tape', displayValue: 'Tape'},
        {value: 'cd', displayValue: 'CD'},
        {value: 'good-day', displayValue: 'Good Day'},
        {value: 'burbone', displayValue: 'Burbone'},
        {value: 'hide&seek', displayValue: 'Hide&Seek'},
        {value: 'parle', displayValue: 'Parle'},
    ];
    const initialState = [
        {
            materialFee: 10.00,
            item: '',
            packingFee: 2.00,
            unpackingFee: 3.00
        },
        {
            materialFee: 2.00,
            item: '',
            packingFee: 1.00,
            unpackingFee: 4.00
        },
        {
            materialFee: 2.00,
            item: '',
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
                options: column.inputType === 'select' ? itemSelectOptions : '',
                name: "row" + row + "Col" + columnCnt,
                value: column.inputType === 'select' ? 'Tape' : eachData[column.name]
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
                value: column.inputType === 'select' ? 'Tape' : '',
                options: column.inputType === 'select' ? itemSelectOptions : ''
            }
        });

        setState(state.concat([emptyState]));
    }

    const inputChangedHandler = (event) => {

        const value = event.target.type === 'text' ? parseFloat(event.target.value.replace('$', '').trim()).toFixed(2)  : event.target.value;


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
            <table className="Table">
                <thead>
                    <RowBuilder columnHeader={getHeader(props.tableStructure)} />
                </thead>
                <tbody>
                    <RowBuilder columnData={state} inputChangedHandler={inputChangedHandler} deleteButtonClickeHandler={deleteButtonClickeHandler} />
                </tbody>
            </table>
            <button className="imagebutton" onClick={addItemClickHandler}> 
                <img src={AddButtonImage} alt="Add"></img> 
                <span>Add Item</span> 
            </button>
        </div>
    );
};

export default TableBuilder;