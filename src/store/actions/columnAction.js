import * as actionTypes from './actionTypes';

export const addColumn = (columnId, columnName, inputType) => {
    return {
        type: actionTypes.ADD_COLUMN,
        columnId: columnId,
        columnType: inputType,
        name: columnName,
    };
};

