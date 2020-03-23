import React, { useState, useRef } from 'react';
import { RowBuilder } from './RowBuilder';
import { tableStructure } from '../../_shared/tableStructure';
import { initialData } from '../../_shared/data';
import { selectOption } from '../../_shared/selectOption';
import './index.scss';
import AddButtonImage from '../../assets/icons/plus.png';

export const TableBuilder = () => {
    const [state, setState] = useState(initialData);
      
    const getTableHeader = () =>
        tableStructure.map(header => header.text);

    const generatKey = (min, max) => 
        Math.random() * (max - min) + min;

    const getEmptyRow = (rowData) => 
        rowData.find(eachRow => tableStructure.every(({ name }) => !eachRow[name]));

    const scrollToEmptyRow = (emptyRowRef) => 
        emptyRowRef.current.scrollIntoView({block: 'end', behavior: 'smooth'});
    
    //Add new row to table.
    const onAddItem = (emptyRowRef) => {
       const row = getEmptyRow(state);

       if(Boolean(row)){
            scrollToEmptyRow(emptyRowRef);
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

            const key = generatKey(1, 100);
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
        const {value} = e.target;

        //Copy state.
        const currentState = [...state];
        
        let updateItem = currentState.find(item => item.key === key);

        updateItem[name]= value;

        //Update state.
        setState([...currentState]);
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
        const currentState = [...state];

        //Remove by filter.
        setState(currentState.filter(item => item.key !== key));
    }

    const headerData = getTableHeader();

    //Create table header.
    const tableHeaderRenderer = headerData.map(eachcolumn => {
        return (
            <td key={eachcolumn}>
                <b>{eachcolumn}</b>
            </td>
        );
    });

    const tableRowData = [...state];
    const emptyRef = useRef();

    //Create table body.
    let emptyRowForAddButton = null;

    const emptyRow = getEmptyRow(tableRowData);

    const tableBodyRenderer = tableRowData.map((eachTableRow, index) => {
    
        const isEmptyRowPresent = Boolean(emptyRow) ?
                                    Object.entries(emptyRow).toString() === Object.entries(eachTableRow).toString() :
                                    false;
                
        const emptyRowRef = isEmptyRowPresent === true ? emptyRef : null;


        if(emptyRowRef !== null){
            emptyRowForAddButton = emptyRowRef;
        }

        return (
            <RowBuilder 
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
            <button className="imagebutton" onClick={ ()=> onAddItem(emptyRowForAddButton)}>
                <img src={AddButtonImage} alt="Add"></img>
                <span>Add Item</span>
            </button>
        </div>
    );
};

