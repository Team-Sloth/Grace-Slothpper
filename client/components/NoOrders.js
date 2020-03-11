import React from 'react';
import {Link} from 'react-router-dom';

class NoOrders extends React.Component {
  render() {
    return (
      <section>
        <h5>
          You have no previous orders to display. Check out our products page to
          get started!
        </h5>
      </section>
    );
  }
}

export default NoOrders;
