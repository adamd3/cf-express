import React from 'react';

const About = () => {
  return (
    <div className="about">
      <h1>About</h1>
      <p>
        The Cystic Fibrosis Varsity Project is a collaboration between the
        groups of Professor Andres Floto at the University of Cambridge, Dr
        Mattia Frontini at the University of Exeter and GlaxoSmithKline. The
        objective of the project is to map gene expression and epigenetic
        changes during acute pulmonary exacerbation in Cystic Fibrosis. You can
        find a preprint describing the main study findings on{' '}
        <a
          href="https://www.biorxiv.org/content/10.1101/2022.10.12.511886v1"
          target="_blank"
          rel="noreferrer"
        >
          bioRxiv
        </a>
        .
      </p>
      <h1>ChIP-Seq data</h1>
      <p>
        ChIP-Seq Genome Browser tracks Median H3K27Ac ChIP-Seq coverage tracks
        can be viewed in the UCSC browser:
        <ul>
          <li>
            <a
              href="http://genome.ucsc.edu/s/cf_varsity/CF_Neutrophil_H3K27Ac_ChIPSeq"
              target="_blank"
              rel="noreferrer"
            >
              Neutrophils
            </a>
          </li>
          <li>
            <a
              href="http://genome.ucsc.edu/s/cf_varsity/CF_Monocyte_H3K27Ac_ChIPSeq"
              target="_blank"
              rel="noreferrer"
            >
              Monocytes
            </a>
          </li>
        </ul>
      </p>

      <h1>Sequence data</h1>
      <p>
        Sequence data have been deposited at the European Genome-phenome Archive
        (EGA) under accession number{' '}
        <a
          href="https://ega-archive.org/studies/EGAS00001006421"
          target="_blank"
          rel="noreferrer"
        >
          EGAS00001006421
        </a>
        . To apply for access, please submit a brief research proposal (no more
        than one page) and a signed Data Access Agreement to{' '}
        <a href="mailto:m.frontini@exeter.ac.uk">m.frontini@exeter.ac.uk</a>.
        Your application will then be considered by the Data Access Committee.
        If successful, you will receive a link to the raw data on EGA for the
        requested accessions.
      </p>
    </div>
  );
};

export default About;
