import React from 'react';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                value={props.value}
                name={props.name}
                onChange={props.changed} />;
            break;
        case ('currency'):
            inputElement = <input
                value={'$' + props.value}
                name={props.name}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    value={props.value}
                    name={props.name}
                    onChange={props.changed}>
                    {/* {props.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))} */}
                </select>
            );
            break;
        default:
            inputElement = <input
                value={props.value}
                name={props.name}
                onChange={props.changed} />;
    }

    return (
            inputElement
    );

};

export default input;