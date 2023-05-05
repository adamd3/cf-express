import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './footer.css';

function Footer() {
  return (
    <footer>
      <div>
        <a
          class="footer-link"
          href="https://github.com/adamd3/cf-express"
          target="_blank"
          rel="noreferrer"
        >
          <span>View on GitHub</span>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
