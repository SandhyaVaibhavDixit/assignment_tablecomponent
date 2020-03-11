import React, { useState } from 'react';
import { RowBuilder } from './RowBuilder/RowBuilder';
import { checkValidity } from '../../shared/utility';

import './TableBuilder.css';
import AddButtonImage from '../../assets/icons/plus.png';

const TableBuilder = props => {
    const itemSelectOptions = [
        { value: 'tape', displayValue: 'Tape' },
        { value: 'cd', displayValue: 'CD' },
        { value: 'good-day', displayValue: 'Good Day' },
        { value: 'burbone', displayValue: 'Burbone' },
        { value: 'hide&seek', displayValue: 'Hide&Seek' },
        { value: 'parle', displayValue: 'Parle' },
    ];
    const initialData = [
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

    const initialState = initialData.map((eachData) => {
        row++;
        let columnCnt = 0;
        const dataStructure = columns.map((column) => {
            columnCnt++;
            return {
                ...column,
                isValid: true,
                key: "row" + row,
                options: column.inputType === 'select' ? itemSelectOptions : '',
                name: "row" + row + "Col" + columnCnt,
                value: column.inputType === 'select' ? 'Tape' : eachData[column.name]
            }
        });
        return dataStructure;
    });

    const [state, setState] = useState(initialState);

    const getHeaderDataStructure = (tableStructure) => {
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

    const inputChangedHandler = (e) => {

        let enteredValue = e.target.type === 'text' ? e.target.value.replace('$', '').trim() : e.target.value;
        const inputType = e.target.getAttribute('inputtype');
        let isValid = true;

        //enteredValue = parseFloat(enteredValue).toFixed(2);

        switch(inputType){
            case 'currency':
                isValid = checkValidity(enteredValue, {required: true, isFloat: true});
                break;
            default:
                isValid = checkValidity(enteredValue, {required: true});
                break;
        }

        //Copy state.
        let currentState = [...state];
        const value = enteredValue;

        currentState = currentState.map(eachObject => {
            return eachObject.map(eachData => (eachData.name === e.target.name ? { ...eachData, value, isValid } : eachData))
        });

        //Update state.
        setState(currentState);
    };

    const deleteButtonClickeHandler = (e) => {

        //Derive row to be deleted.
        const rowId = e.target.id;

        //Copy state.
        let currentState = [...state];

        currentState = currentState.filter(eachObject => (eachObject[0].key !== rowId));

        //Update state.
        setState(currentState);
    }

    const headerData = getHeaderDataStructure(props.tableStructure);

    const tableHeaderRenderer = headerData.map(eachcolumn => {
        return (
            <td key={eachcolumn}>
                <b>{eachcolumn}</b>
            </td>
        );
    })

    const tableRowData = [...state];
    const tableBodyRenderer = tableRowData.map(eachTableRow => {
        return (
            <RowBuilder rowData={eachTableRow} inputChangedHandler={inputChangedHandler} deleteButtonClickeHandler={deleteButtonClickeHandler} />
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
            <button className="imagebutton" onClick={addItemClickHandler}>
                <img src={AddButtonImage} alt="Add"></img>
                <span>Add Item</span>
            </button>
        </div>
    );
};

export default TableBuilder;