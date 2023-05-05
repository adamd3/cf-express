import { ReactComponent as Logo } from './logo.svg';

import './header.css';

function Header() {
  return (
    <header>
      <h1>Cystic Fibrosis gene expression atlas</h1>
      <Logo className="logo" />
    </header>
  );
}

export default Header;
