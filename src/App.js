import React from 'react';

import Table from './components/TableBuilder/TableBuilder';

import './App.css';

function App() {
  const tableStructure = [
    {
      text:'Item',
      name: 'item',
      inputType: 'select'
    },
    {
      text:'Material Fee',
      name: 'materialFee',
      inputType: 'currency'
    },  
    {
      text:'Packing Fee',
      name: 'packingFee',
      inputType: 'currency'
    },
    {
      text:'Unpacking Fee',
      name: 'unpackingFee',
      inputType: 'currency'
    }
];


  return (
    <div className="App">
      Table component.
      <Table tableStructure={tableStructure}/>
    </div>
  );
}

export default App;
