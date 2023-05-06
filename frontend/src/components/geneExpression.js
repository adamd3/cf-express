import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ExpressionPlot from './expressionPlot';

function GeneExpression() {
  const [gene, setGene] = useState('');
  const [expressionValues, setExpressionValues] = useState('');
  const [geneOptions, setGeneOptions] = useState([]);
  const [stats, setStats] = useState({});

  // AD: disable for testing until integrated with backend
  if (process.env.NODE_ENV !== 'test') {
    useEffect(() => {
      axios
        // .get('/api/stats')
        .get('http://127.0.0.1:5000/api/stats')
        .then((response) => {
          setStats(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  }

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
        <button type="submit">View</button>
      </form>

      {expressionValues.length > 0 ? (
        <div>
          <ExpressionPlot expressionValues={expressionValues} />
        </div>
      ) : (
        <div className="stats">
          <h2>Database statistics</h2>
          <table>
            <tbody>
              <tr>
                <td>Total samples:</td>
                <td>{stats.total_samples}</td>
              </tr>
              <tr>
                <td>Total genes:</td>
                <td>{stats.total_genes}</td>
              </tr>
              <tr>
                <td>Total expression values:</td>
                <td>{stats.total_values}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GeneExpression;
