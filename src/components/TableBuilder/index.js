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
    
    const emptyRow = getEmptyRow(state, tableStructure);

    const hasEmptyRowMatch = (row) => Boolean(emptyRow) ? emptyRow.key === row.key : false;
    
    const getTableHeader = () => tableStructure.map(header => header.text);

    const scrollToEmptyRow = (emptyRowRef) => emptyRowRef.current.scrollIntoView({block: 'end', behavior: 'smooth'});
    
    //Add new row to table.
    const onAddItem = () => {
       if (Boolean(emptyRow)){
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
    const onChange = (key,  e) => {
        const { name, value } = e.target;

        const updatedState = state.map(row => {
            if ( row.key === key ) { 
                row[name] = value
            }
            return row;
        });

        //Update state.
        setState(updatedState);
    };

    //Delete row.
    const onDelete = (key) => {
        //Remove by filter.
        setState(state.filter(item => item.key !== key));
    }

    //Create table header.
    const renderTableHeader = () => {
        const headerNames = [...getTableHeader(), ''];
        
        return headerNames.map(headerName => {
            return (
                <td key={headerName}>
                    <b>{headerName}</b>
                </td>
            );
        });
    }

    //Create table body.
    const renderTableBody = () => {
        return state.map((eachTableRow, index) => {   
            const emptyRowRef = hasEmptyRowMatch(eachTableRow) === true ? emptyRef : null;

            const onInputChange = (e) => onChange(eachTableRow.key, e);
            const onRowDelete   = () => onDelete(eachTableRow.key);

            return (
                <RowBuilder 
                    tableStructure ={tableStructure}
                    key            ={eachTableRow.key} 
                    rowData        ={eachTableRow} 
                    options        ={selectOption} 
                    onChange       ={onInputChange} 
                    onDelete       ={onRowDelete} 
                    emptyRowRef    ={emptyRowRef}
                />
            )
        });
    }

    const renderAddAction = () => {
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