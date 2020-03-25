const inputTypes = ['input', 'currency'];

export const findInputElement = (tableStructure) => tableStructure.find(element => inputTypes.includes(element.inputType));
