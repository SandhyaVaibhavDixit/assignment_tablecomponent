import React from 'react';
import Input from '../../UI/Input';

const rowBuilder = (props) => {
    const inputChangedHandler = (event, inputIdentifier) => {
        // const updatedFormElement = updateObject(inputIdentifier, {
        //   value: event.target.value,
        // });
    };

    let columns = null;
    if (props.type === 'header') {
        columns = props.columnData.map(eachcolumn => {
            return (
                <th key={eachcolumn}>
                    {eachcolumn}
                </th>
            );
        });
    }
    else {
        let columnCounter = 1;
        columns = props.columnData.map(eachcolumn => {
            let columnId = "column_" + columnCounter;
            columnCounter++;
            return (
                <td key={columnId} >
                    <Input
                        key={columnId}
                        elementType={eachcolumn.inputType}
                        value={eachcolumn.value}
                        changed={event => inputChangedHandler(event, columnId)} />
                </td>);
        });
    }
    return (
        <tr>
            {columns}
        </tr>
    )
}

export default rowBuilder;