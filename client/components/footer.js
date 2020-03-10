import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => (
  <div>
    <div className="siteHeader">
      <div className="siteHeader__section">
        <div className="siteHeader__logo">
          <Link to="/home">
            <img src="/img/sloth.gif" width={70} />
          </Link>
        </div>
        <div className="siteHeader__logo">
          <Link to="/home">Slothpper</Link>
        </div>
      </div>
      <div className="siteHeader__section">
        <div className="siteHeader__item siteHeaderFooter">
          {'Copyright © Slothpper '}
          {new Date().getFullYear()}
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
