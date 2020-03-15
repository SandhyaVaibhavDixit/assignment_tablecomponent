import React, { useState } from 'react';
import { RowBuilder } from './RowBuilder/RowBuilder';
import { checkValidity } from '../../_shared/utility';
import { tableStructure } from '../../_shared/tableStructure';
import { selectOption } from '../../_shared/selectOption';

import './TableBuilder.scss';
import AddButtonImage from '../../assets/icons/plus.png';

const TableBuilder = props => {
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

    const columns = tableStructure;
    let row = 0;

    const initialState = initialData.map((eachData) => {
        row++;
        let columnCnt = 0;
        const dataStructure = columns.map((column) => {
            columnCnt++;
            return {
                ...column,
                index: columnCnt,
                isValid: true,
                rowKey: "row" + row,
                options: column.inputType === 'select' ? selectOption : '',
                name: "row" + row + "Col" + columnCnt,
                value: column.inputType === 'select' ? '' : eachData[column.name]
            }
        });
        return dataStructure;
    });

    const [state, setState] = useState(initialState);

    const getTableHeader = (tableStructure) => {
        const header = tableStructure.map(header => header.text);
        return header;
    }

    const onAddItem = () => {
        let rowNo = Math.floor(Math.random() * 100); //state.length;
        let columnCnt = 0;
        const emptyState = columns.map((column) => {
            columnCnt++;
            return {
                ...column,
                index: columnCnt,
                isValid: true,
                rowKey: 'row' + rowNo,
                name: 'row' + rowNo + 'Col' + columnCnt,
                value: column.inputType === 'select' ? '' : 0.00,
                options: column.inputType === 'select' ? selectOption : ''
            }
        });

        setState(state.concat([emptyState]));
    }

    const onChange = (e) => {
        e.preventDefault();
        let enteredValue = (e.target.type === 'text') ? 
                                e.target.value.replace('$', '').trim() : 
                                e.target.value;

        const inputType = e.target.getAttribute('inputtype');
        let isValid = true;

        let value = enteredValue;

        switch (inputType) {
            case 'currency':
                isValid = checkValidity(enteredValue, { required: true, isFloat: true });
                value = enteredValue
                break;
            default:
                isValid = checkValidity(enteredValue, { required: true });
                break;
        }

        //Copy state.
        const previousState = [...state];
        
        const newState = previousState.map(eachObject => {
            return eachObject.map(eachData => (eachData.name === e.target.name ? { ...eachData, value, isValid } : eachData))
        });

        //Update state.
        setState(newState);
    };

    const onDelete = (e) => {

        //Derive row to be deleted.
        const rowKey = e.target.id;

        //Copy state.
        const previousState = [...state];

        const newState = previousState.filter(eachObject => (eachObject[0].rowKey !== rowKey));

        //Update state.
        setState(newState);
    }

    const headerData = getTableHeader(tableStructure);

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
            <RowBuilder key={eachTableRow[0].rowKey} rowData={eachTableRow} onChange={onChange} onDelete={onDelete} />
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