import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ExpressionPlot from './expressionPlot';

function GeneExpression() {
  const [gene, setGene] = useState('');
  const [expressionValues, setExpressionValues] = useState('');
  const [geneOptions, setGeneOptions] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      axios
        // .get('/api/stats')
        .get('https://blueprint.haem.cam.ac.uk/api/stats')
        .then((response) => {
          setStats(response.data);
        })
        .catch(console.error);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      // .get('/api/gene_expression', {
      .get('https://blueprint.haem.cam.ac.uk/api/gene_expression', {
        params: { gene: gene },
      })
      .then((response) => {
        setExpressionValues(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGeneChange = async (event) => {
    const value = event.target.value;
    setGene(value);
    if (value.length >= 2) {
      await axios
        // .get('/api/gene_options', {
        .get('https://blueprint.haem.cam.ac.uk/api/gene_options', {
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
            placeholder="e.g. TLR5"
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
