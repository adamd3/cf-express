import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function ExpressionPlot(props) {
  const { expressionValues } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    const groups = expressionValues.reduce((groups, value) => {
      const timepointId = value.timepoint_id;
      if (!groups[timepointId]) {
        groups[timepointId] = [];
      }
      groups[timepointId].push(value);
      return groups;
    }, {});

    const traces = Object.keys(groups).map((timepointId) => {
      const values = groups[timepointId];
      const x = values.map((value) => value.cell_type);
      const y = values.map((value) => value.value);
      return {
        x,
        y,
        type: 'bar',
        name: `Timepoint ${timepointId}`,
      };
    });

    setData(traces);
  }, [expressionValues]);

  return (
    <Plot
      data={data}
      layout={{
        title: 'Expression Values by Cell Type and Timepoint',
        barmode: 'group',
        xaxis: { title: 'Cell Type' },
        yaxis: { title: 'Expression Value' },
      }}
    />
  );
}

export default ExpressionPlot;
