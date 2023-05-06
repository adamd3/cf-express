import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

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

test('renders the plot after submitting a gene', () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/Gene name:/i);
  const submitButton = screen.getByRole('button', { name: /View/i });

  inputElement.value = 'TLR5';
  submitButton.click();

  // AD: test for plot when integrated with backend

  // const plotElement = screen.getByRole('img', {
  //   name: /gene expression plot/i,
  // });
  // expect(plotElement).toBeInTheDocument();
});
