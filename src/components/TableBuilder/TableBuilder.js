import React, { useState } from 'react';
import Raw from './RowBuilder/RawBuilder';

const TableBuilder = props => {
    const initialState = [
        {
            materialFee: 0.00,
            item: '',
            packingFee: 0.00,
            unpackingFee: 0.00
        },
    ];

    const [state, setState] = useState(initialState);
    const updateState = data => setState(prevState => ({ ...prevState, ...data }));

    const getHeader = (tableStructure) =>{
        let header = tableStructure.map(function (eachObject) {
            return(eachObject.name);
        });

        return header;
    }
    const transformPropsToHeaderAndRows = (tableStructure) => {
        
        const abc = JSON.stringify(tableStructure);
        console.log(abc);

        // //Table body column types
        // let row;
        // var result = tableStructure.map(function(eachObject) {
        //     return(eachObject.name);
        // });

        // var bodyDefination = tableStructure.reduce(function (acc, cur, i) {
        //     acc[i] = { ...cur, value: ""};
        //     return acc;
        // }, {});
        // console.log(bodyDefination);

    };

    const addItemClickHandler = (event) => {
        return null;
    }

    const abc = transformPropsToHeaderAndRows(props.tableStructure);

    return (
        <div>
            <table>
                <thead>
                    {/* render header */}
                    <Raw type="header" columnData={getHeader(props.tableStructure)} />
                </thead>
                <tbody>
                    <Raw type="body" columnData={props.tableStructure} />
                </tbody>
            </table>
            <button onClick={addItemClickHandler}> Add Item</button>
        </div>
    );
};

export default TableBuilder;