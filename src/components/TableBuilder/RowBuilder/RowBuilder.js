import React from 'react';
import Input from '../../UI/Input';

import DeleteButtonImage from '../../../assets/icons/delete.png';

export const RowBuilder = (props) => {
    const { columnHeader, columnData, inputChangedHandler, deleteButtonClickeHandler } = props;
    let columns = {};
    if (columnHeader !== undefined) {
        columns = columnHeader.map(eachcolumn => {
            return (
                <th key={eachcolumn}>
                    {eachcolumn}
                </th>
            );
        });

        columns = <tr key="header">{columns}<th></th></tr>
    }

    if (columnData !== undefined) {
        columns = columnData.map(eachcolumn => {
            const allTD = (eachcolumn.map(column => {
                return (
                    <td key={column.name} >
                        <Input
                            key={column.key}
                            name={column.name}
                            elementType={column.inputType}
                            value={column.value}
                            changed={event => inputChangedHandler(event)} />
                    </td>);
            })
            );
            return (<tr key={eachcolumn[0].key}>
                {allTD}
                <td>
                    <button id={eachcolumn[0].key}
                        onClick={event => deleteButtonClickeHandler(event)}>
                    <img id={eachcolumn[0].key} src={DeleteButtonImage} alt="Delete"></img>
                    </button>
                </td>
            </tr>);
        });
    }

    return (
        columns
    )
}