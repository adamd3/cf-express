import axios from 'axios';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ReactComponent as Logo } from './logo.svg';
import gskLogo from './GSK-Logo-1.png';
import uniCamLogo from './UniOfCam.jpg';

import './sidebar.css';

function Sidebar(props) {
  const [gene, setGene] = useState('');
  const [geneOptions, setGeneOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .get('http://127.0.0.1:5000/api/gene_expression', {
        // .get('https://blueprint.haem.cam.ac.uk/api/gene_expression', {
        params: { gene: gene },
      })
      .then((response) => {
        props.onUpdateExpressionValues(response.data);
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
        .get('http://127.0.0.1:5000/api/gene_options', {
          // .get('https://blueprint.haem.cam.ac.uk/api/gene_options', {
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
    <div className="sidebar-container">
      <div className="sidebar-header">
        <a href="./">
          <h1>CF expression browser</h1>
        </a>
      </div>
      <div className="sidebar-content">
        <h2>Myeloid cell gene expression data</h2>
        <Logo className="logo" />
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
        <img src={uniCamLogo} alt="University of Cambridge" />
        <img src={gskLogo} alt="GSK" />
      </div>
      <div className="sidebar-footer">
        <a
          className="footer-link"
          href="https://github.com/adamd3/cf-express"
          target="_blank"
          rel="noreferrer"
        >
          <span>View on GitHub</span>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
