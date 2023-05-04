import axios from 'axios';
import React, { useState } from 'react';
import ExpressionPlot from './expressionPlot';

function GeneExpression() {
  const [gene, setGene] = useState('');
  const [expressionValues, setExpressionValues] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      // .get('/api/gene_expression', {
      .get('http://127.0.0.1:5000/api/gene_expression', {
        params: { gene: gene },
      })
      .then((response) => {
        setExpressionValues(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Gene Expression</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gene">Gene:</label>
          <input
            type="text"
            id="gene"
            value={gene}
            onChange={(event) => setGene(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {expressionValues.length > 0 && (
        <div>
          <ExpressionPlot expressionValues={expressionValues} />
        </div>
      )}
    </div>
  );
}

export default GeneExpression;
