import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

function Header() {
  return (
    <header>
      <Link to="/about">About</Link>
    </header>
  );
}

export default Header;
