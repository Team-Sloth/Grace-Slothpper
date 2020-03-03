import React from 'react';
import {Link} from 'react-router-dom';

/**
 * COMPONENT
 */
const Home = () => {
  return (
    <div>
      <h1>Welcome to Sloth World!</h1>
      <h2>
        <Link to="/products">Check out our sloth products!</Link>
      </h2>
      <div>
        <Link to="/products">
          <img src="/img/mask.jpg" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
