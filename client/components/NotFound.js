import React from 'react';
import {Link} from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div className="cardsi">
          <Link to="/products">
            <img src="https://i.imgflip.com/3s3xcc.jpg" />
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
