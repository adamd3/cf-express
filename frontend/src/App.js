import React, { useState } from 'react';
import GeneExpression from './components/geneExpression';
import Header from './components/header';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/about';

import './App.css';
import './components/sidebar.css';

function App() {
  const [expressionValues, setExpressionValues] = useState('');
  const updateExpressionValues = (values) => {
    setExpressionValues(values);
  };

  return (
    <Router>
      <div className="App">
        <div className="grid-container">
          <aside className="sidebar">
            <Sidebar onUpdateExpressionValues={updateExpressionValues} />
          </aside>
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route
                path="/"
                element={<GeneExpression expressionValues={expressionValues} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
