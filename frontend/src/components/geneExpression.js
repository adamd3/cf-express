import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ExpressionPlot from './expressionPlot';

function GeneExpression(props) {
  const { expressionValues } = props;

  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get('http://127.0.0.1:5000/api/stats')
        // .get('https://blueprint.haem.cam.ac.uk/api/stats')
        .then((response) => {
          setStats(response.data);
        })
        .catch(console.error);
    };
    fetchData();
  }, []);

  return (
    <div>
      {expressionValues.length > 0 ? (
        <div>
          <ExpressionPlot expressionValues={expressionValues} />
        </div>
      ) : (
        <div className="stats">
          <h1>Database statistics</h1>
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
