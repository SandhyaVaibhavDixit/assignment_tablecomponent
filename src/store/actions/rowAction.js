import * as actionTypes from './actionTypes';

export const addRow = (rowId) => {
    return {
        type: actionTypes.ADD_ROW,
        rowId: rowId
    };
};

