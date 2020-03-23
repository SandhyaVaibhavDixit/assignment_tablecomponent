import React, { useState, useRef } from 'react';
import { RowBuilder } from './RowBuilder';
import { tableStructure } from '../../_shared/tableStructure';
import { initialData } from '../../_shared/data';
import { selectOption } from '../../_shared/selectOption';
import './index.scss';
import AddButtonImage from '../../assets/icons/plus.png';

export const TableBuilder = () => {
    const [state, setState] = useState(initialData);
      
    const getTableHeader = () => {
        const header = tableStructure.map(header => header.text);
        return header;
    }

    const generatKey = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    const focusEmptyRowElement = (emptyRowRef) => {
        emptyRowRef.current.scrollIntoView({block: 'end', behavior: 'smooth'});
    }

    //Add new row to table.
    const onAddItem = (emptyRowRef) => {
        const perviousState = [...state];
        let isEmptyRowExist = false;
        
        perviousState.every(eachRow => {
            isEmptyRowExist = checkIfRowIsEmpty(eachRow);    
            if(isEmptyRowExist === true){
                return false;
            }    
            return isEmptyRowExist;
        });

        if(isEmptyRowExist === true){
            focusEmptyRowElement(emptyRowRef);
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
                    ...emptyState},
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
    const onDelete = (e, key) => {
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

    const checkIfRowIsEmpty = (data) => {
        let isRowEmpty = true;
       
        Object.keys(data).forEach(key => {
            if (key === 'key' || key === 'isNew')  return;
            if(data[key] === null || data[key] === 0 || data[key] === '' ) {
                isRowEmpty = isRowEmpty && true ;
            } 
            else {
                isRowEmpty = isRowEmpty && false;
            }
        });

        return isRowEmpty;
    }

    //Create table body.
    let emptyRowRef;
    let emptyRowForAddButton = null;

    const tableBodyRenderer = tableRowData.map((eachTableRow, index) => {
        emptyRowRef = checkIfRowIsEmpty(eachTableRow) === true ? emptyRef : null;

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
            <button className="imagebutton" onClick={e => onAddItem(emptyRowForAddButton)}>
                <img src={AddButtonImage} alt="Add"></img>
                <span>Add Item</span>
            </button>
        </div>
    );
};

