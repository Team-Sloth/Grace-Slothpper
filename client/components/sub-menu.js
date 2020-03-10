import React from 'react';
import {Link} from 'react-router-dom';

const SubMenu = ({handleClick}) => (
  <div>
    <div className="siteHeader">
      <div className="siteHeader__section">
        <div className="siteHeader__item siteHeaderButton">
          <Link to="/products"> ALL PRODUCTS</Link>
        </div>
        <div className="siteHeader__item siteHeaderButton">
          <Link to="/products?category=Sloth">SLOTH</Link>
        </div>
        <div className="siteHeader__item siteHeaderButton">
          <Link to="/products?category=Coronavirus">CORONAVIRUS</Link>
        </div>
      </div>
    </div>
  </div>
);

export default SubMenu;
