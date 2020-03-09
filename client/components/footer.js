import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => (
  <div>
    <footer>
      <Link to="/home">
        <img src="/img/sloth.gif" width={90} />
      </Link>
      <div>
        {'Copyright © Slothpper '}
        {new Date().getFullYear()}
      </div>
    </footer>
  </div>
);

export default Footer;
