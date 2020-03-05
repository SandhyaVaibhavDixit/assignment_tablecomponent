import React from 'react';

import Table from './components/TableBuilder/TableBuilder';

import './App.css';

function App() {
  const tableStructure = [
    {
      name:'Item',
      inputType: 'select'
    },
    {
      name:'Material Fee',
      inputType: 'currency'
    },  
    {
      name:'Packing Fee',
      inputType: 'currency'
    },
    {
      name:'Unpacking Fee',
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
