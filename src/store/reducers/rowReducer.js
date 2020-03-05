import * as actionTypes from '../actions/actionTypes';

const initialState = {
    rows: null,
    error: false,
    columnNos: 0,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ROW: return addRow(state, action);
        case actionTypes.DELETE_ROW: return deleteRow(state, action);
        default: return state;
    };
};


export default reducer;