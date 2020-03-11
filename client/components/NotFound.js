import React from 'react';
import {Link} from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/products?category=Sloth" style={{textDecoration: 'none'}}>
            <h5 className="sub">There's nothing here...</h5>
          </Link>
        </div>
        <div>
          <Link to="/products" style={{textDecoration: 'none'}}>
            <h2 className="sub">Why not buy some sloth gear?</h2>
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
