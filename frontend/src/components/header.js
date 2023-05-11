import { ReactComponent as Logo } from './logo.svg';

import './header.css';

function Header() {
  return (
    <header>
      <h1>Cystic Fibrosis expression browser</h1>
      <h2>Myeloid cell gene expression data</h2>
      <a href="/">
        <Logo className="logo" />
      </a>
    </header>
  );
}

export default Header;
