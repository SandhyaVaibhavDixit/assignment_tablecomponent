export const getEmptyRow = (data, tableStructure) => data.find(eachRow => tableStructure.every(({ name }) => !eachRow[name]));
