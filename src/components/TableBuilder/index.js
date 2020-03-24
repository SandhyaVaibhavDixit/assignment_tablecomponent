import React, { useState, useRef } from 'react';
import { initialData } from '../../_shared/data';
import { selectOption } from '../../_shared/selectOption';
import { getEmptyRow } from '../../_util/getEmptyRow';
import { generateKey } from '../../_util/generateKey';
import { RowBuilder } from './RowBuilder';

import './index.scss';
import AddButtonImage from '../../assets/icons/plus.png';

export const TableBuilder = ( props ) => {
    const { tableStructure } = props;
    const [state, setState] = useState(initialData);
    const emptyRef = useRef();
    
    const tableRowData = [...state];

    const emptyRow = getEmptyRow(tableRowData, tableStructure);

    const getDidEmptyRowMatch = (row) => Boolean(emptyRow) ? emptyRow.key === row.key : false;
    
    const getTableHeader = () => tableStructure.map(header => header.text);

    const scrollToEmptyRow = (emptyRowRef) => emptyRowRef.current.scrollIntoView({block: 'end', behavior: 'smooth'});
    
    //Add new row to table.
    const onAddItem = () => {
       if(Boolean(emptyRow)){
            scrollToEmptyRow(emptyRef);
        }
        else {
            const emptyState = tableStructure.reduce((object, column) => {
                switch(column.inputType){
                    case 'currency':
                        object[column.name] = 0;
                        break;
                    case 'select':
                    case 'input':
                    default:
                        object[column.name] = '';
                }

                return object;
            }, {});

            const key = generateKey(1, 100);
            setState([
                {
                    key: key,
                    isNew: true, 
                    ...emptyState
                },
                    ...state
            ]);
        }
    }

    //Input and select on change handler. 
    const onChange = (key, name, e) => {
        const { value } = e.target;

        //Copy state.
        const previousState = [...state];
        
        let updateItem = previousState.find(item => item.key === key);

        updateItem[name]= value;

        //Update state.
        setState([...previousState]);
    };

    //If new row midified then remove the isNew attribute.
    const onBlur = (data) => {
        const updatedData = [...state];

        let updateItem = updatedData.find(item => item.key === data.key);
        delete updateItem.isNew;
        
        setState([...updatedData]);
    }

    //Delete row.
    const onDelete = (key) => {
        //Copy state.
        const previousState = [...state];

        //Remove by filter.
        setState(previousState.filter(item => item.key !== key));
    }

    //Create table header.
    const renderTableHeader = () =>{
        const headerData = getTableHeader();
    
        return headerData.map(eachcolumn => {
            return (
                <td key={eachcolumn}>
                    <b>{eachcolumn}</b>
                </td>
            );
        });
    }

    //Create table body.
    const renderTableBody = () => {
        return tableRowData.map((eachTableRow, index) => {   
            const emptyRowRef = getDidEmptyRowMatch(eachTableRow) === true ? emptyRef : null;

            return (
                <RowBuilder 
                    tableStructure  ={tableStructure}
                    key             ={eachTableRow.key} 
                    rowData         ={eachTableRow} 
                    options         ={selectOption} 
                    onChange        ={onChange} 
                    onDelete        ={onDelete} 
                    onBlur          ={onBlur}
                    emptyRowRef     ={emptyRowRef}
                />
            )
        });
    }

    const renderAddAction = () =>{
        return(
            <button className="imagebutton" onClick={ () => onAddItem()}>
                <img src={AddButtonImage} alt="Add"></img>
                <span>Add Item</span>
            </button>
        );
    }

    return (
        <div>
            <table className="Table">
                <thead>
                    <tr>
                        {renderTableHeader()}
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </table>
            {renderAddAction()}
        </div>
    );
};