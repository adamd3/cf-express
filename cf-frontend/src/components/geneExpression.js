import React, { useState } from 'react';
import axios from 'axios';

function GeneExpression() {
  const [gene, setGene] = useState('');
  const [group, setGroup] = useState('');
  const [timepoint, setTimepoint] = useState('');
  const [cell, setCellType] = useState('');
  const [expressionValues, setExpressionValues] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      // .get('/api/gene_expression', {
      .get('http://127.0.0.1:5000/api/gene_expression', {
        params: {
          gene: gene,
          cell: cell,
        },
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
          <label htmlFor="cellType">Cell Type:</label>
          <input
            type="text"
            id="cell"
            value={cell}
            onChange={(event) => setCellType(event.target.value)}
          />
        </div>
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
        <table>
          <thead>
            <tr>
              <th>Gene ID</th>
              <th>Group ID</th>
              <th>Timepoint ID</th>
              <th>Cell Type</th>
              <th>Expression Value</th>
            </tr>
          </thead>
          <tbody>
            {expressionValues.map((row, index) => (
              <tr key={index}>
                <td>{row.gene_id}</td>
                <td>{row.group_id}</td>
                <td>{row.timepoint_id}</td>
                <td>{row.cell_type}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GeneExpression;
