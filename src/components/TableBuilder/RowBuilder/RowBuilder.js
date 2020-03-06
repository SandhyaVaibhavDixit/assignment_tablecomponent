import React from 'react';
import Input from '../../UI/Input';

export const RowBuilder = (props) => {
    let { columnHeader, columnData , inputChangedHandler} = props;

    let columns = {};
    if (columnHeader !== undefined) {
        columns = columnHeader.map(eachcolumn => {
            return (
                <th key={eachcolumn}>
                    {eachcolumn}
                </th>
            );
        });

        columns = <tr key="header">{columns}</tr>
    }

    if (columnData !== undefined) {
        let row = 0;
        columns = columnData.map(eachcolumn => {
            row++;
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
            return (<tr key={row}>{allTD}</tr>);
        });
    }

    return (
        columns
        //        columnHeader ? (<tr>{columns}</tr>) : {columns}
    )
}