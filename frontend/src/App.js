import logo from './logo.svg';
import React from 'react';
import GeneExpression from './components/geneExpression';
import Header from './components/header';
import Footer from './components/footer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <GeneExpression />
      </main>
      <Footer />
    </div>
  );
}

export default App;
