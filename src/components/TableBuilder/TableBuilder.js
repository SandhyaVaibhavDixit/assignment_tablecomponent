import React, { useState, useRef } from 'react';
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

    const FocusEmptyRowElement = (emptyRowRef) => {
        emptyRowRef.current.scrollIntoView({block: 'end', behavior: 'smooth'});
    }

    const onAddItem = (emptyRowRef) => {
        const perviousState = [...state];
        let hasEmptyRowExist = false;
        perviousState.every(eachRow => {
            hasEmptyRowExist = checkIfRowIsEmpty(eachRow);    
            if(hasEmptyRowExist === true){
                return false;
            }    
            return hasEmptyRowExist;
        });

        if(hasEmptyRowExist === true){
            FocusEmptyRowElement(emptyRowRef);
        }
        else {
            const emptyState = tableStructure.reduce((object, column) => {
                if ( column.inputType === 'select' ) {
                    object[column.name] = '';
                }
                else {
                    object[column.name] = 0;
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

    const onChange = (key, name, e) => {
        const {value} = e.target;

        //Copy state.
        const currentState = [...state];
        
        let updateItem = currentState.find(item => item.key === key);

        updateItem[name]= value;

        //Update state.
        setState([...currentState]);
    };

    const onBlur = (data) => {
        const updatedData = [...state];
        let updateItem = updatedData.find(item => item.key === data.key);
        delete updateItem.isNew;
        setState([...updatedData]);
    }

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

    let emptyRowRef;
    let rowRefForButton = null;
    const tableBodyRenderer = tableRowData.map((eachTableRow, index) => {
        emptyRowRef = checkIfRowIsEmpty(eachTableRow) === true ? emptyRef : null;

        if(emptyRowRef !== null){
            rowRefForButton = emptyRowRef;
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
            <button className="imagebutton" onClick={e => onAddItem(rowRefForButton)}>
                <img src={AddButtonImage} alt="Add"></img>
                <span>Add Item</span>
            </button>
        </div>
    );
};

