import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './footer.css';

function Footer() {
  return (
    <footer>
      <a
        className="footer-link"
        href="https://github.com/adamd3/cf-express"
        target="_blank"
        rel="noreferrer"
      >
        <span>View on GitHub</span>
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </footer>
  );
}

export default Footer;
