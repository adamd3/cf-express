import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { saveAs } from 'file-saver';

function ExpressionPlot(props) {
  const { expressionValues } = props;

  const [data, setData] = useState([]);
  const [timepointLabels, setTimepointLabels] = useState({});

  useEffect(() => {
    const groups = expressionValues.reduce((groups, value) => {
      const timepointId = value.timepoint_id;
      if (!groups[timepointId]) {
        groups[timepointId] = [];
      }
      groups[timepointId].push(value);
      return groups;
    }, {});

    const timepointLabels = {
      1: 'HV',
      2: 'CF day 0',
      3: 'CF day 14',
      4: 'CF day 30',
    };

    const traces = Object.keys(groups).map((timepointId) => {
      const values = groups[timepointId];
      const timepointLabel = timepointLabels[timepointId];
      const x = values.map((value) => value.cell_type);
      const y = values.map((value) => value.value);
      return {
        x,
        y,
        type: 'box',
        name: timepointLabel,
      };
    });

    setData(traces);
    setTimepointLabels(timepointLabels);
  }, [expressionValues]);

  const handleDownloadData = () => {
    const csvData = expressionValues.map(
      ({ timepoint_id, cell_type, value }) =>
        `${timepointLabels[timepoint_id]},${cell_type},${value}`
    );
    const csvBlob = new Blob(
      [`Timepoint,Cell Type,Expression Value\n${csvData.join('\n')}`],
      { type: 'text/csv;charset=utf-8' }
    );
    saveAs(csvBlob, 'expression_values.csv');
  };

  return (
    <>
      <Plot
        data={data}
        layout={{
          title: 'Expression Values by Cell Type and Timepoint',
          boxmode: 'group',
          xaxis: { title: 'Cell Type' },
          yaxis: { title: 'log2(FPKM)' },
        }}
      />
      <button onClick={handleDownloadData}>Download Data</button>
    </>
  );
}

export default ExpressionPlot;
