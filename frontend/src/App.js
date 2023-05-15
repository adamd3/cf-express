import React, { useState } from 'react';
import GeneExpression from './components/geneExpression';

import Header from './components/header';
import Sidebar from './components/sidebar';

import './App.css';
import './components/sidebar.css';

function App() {
  const [expressionValues, setExpressionValues] = useState('');
  const updateExpressionValues = (values) => {
    setExpressionValues(values);
  };

  return (
    <div className="App">
      <div className="grid-container">
        <aside className="sidebar">
          <Sidebar onUpdateExpressionValues={updateExpressionValues} />
        </aside>
        <Header />
        <main className="main-content">
          <GeneExpression expressionValues={expressionValues} />
        </main>
      </div>
    </div>
  );
}

export default App;
