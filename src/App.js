import React from 'react';
import { tableStructure } from './_shared/tableStructure';
import { TableBuilder } from './components/TableBuilder';

import './App.scss';

function App() {
  return (
    <div className="App">
      <TableBuilder tableStructure ={tableStructure}/>
    </div>
  );
}

export default App;
