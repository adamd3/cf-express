import axios from 'axios';
import React, { useState } from 'react';
import ExpressionPlot from './expressionPlot';

function GeneExpression() {
  const [gene, setGene] = useState('');
  const [expressionValues, setExpressionValues] = useState('');
  const [geneOptions, setGeneOptions] = useState([]);

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

  const handleGeneChange = (event) => {
    const value = event.target.value;
    setGene(value);
    if (value.length >= 2) {
      axios
        // .get('/api/gene_options', {
        .get('http://127.0.0.1:5000/api/gene_options', {
          params: { gene: value },
        })
        .then((response) => {
          setGeneOptions(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="gene">Gene name:</label>
        <div>
          <input
            type="text"
            id="gene"
            value={gene}
            onChange={handleGeneChange}
            list="gene-options"
          />
          <datalist id="gene-options">
            {geneOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </datalist>
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
