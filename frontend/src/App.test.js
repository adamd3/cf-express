import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ExpressionPlot from './components/ExpressionPlot';

test('renders the app title', async () => {
  render(<App />);
  const titleElement = screen.getByText(/Cystic Fibrosis expression browser/i);
  await expect(titleElement).toBeInTheDocument();
});

test('renders the gene input field', async () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/Gene name:/i);
  await expect(inputElement).toBeInTheDocument();
});

test('renders the plot after submitting a gene', async () => {
  const exampleData = [
    {
      cell_type: 'Neutophils',
      group_id: 2,
      timepoint_id: 2,
      gene_id: 8699,
      value: 5.24167179017928,
    },
    {
      cell_type: 'Neutophils',
      group_id: 2,
      timepoint_id: 3,
      gene_id: 8699,
      value: 4.5253315378317,
    },
    {
      cell_type: 'Neutophils',
      group_id: 2,
      timepoint_id: 4,
      gene_id: 8699,
      value: 4.77694425762578,
    },
    {
      cell_type: 'Neutophils',
      group_id: 1,
      timepoint_id: 1,
      gene_id: 8699,
      value: 2.41403422320539,
    },

    {
      cell_type: 'Monocytes',
      group_id: 2,
      timepoint_id: 2,
      gene_id: 8699,
      value: 4.10879538851554,
    },
    {
      cell_type: 'Monocytes',
      group_id: 2,
      timepoint_id: 3,
      gene_id: 8699,
      value: 4.0354929237734,
    },
    {
      cell_type: 'Monocytes',
      group_id: 2,
      timepoint_id: 4,
      gene_id: 8699,
      value: 4.10755295096961,
    },
    {
      cell_type: 'Monocytes',
      group_id: 1,
      timepoint_id: 1,
      gene_id: 8699,
      value: 3.83490032548727,
    },
  ];
  render(<ExpressionPlot expressionValues={exampleData} />);
  const downloadButton = screen.getByRole('button', {
    name: /Download Data/i,
  });
  expect(downloadButton).toBeInTheDocument();
});
