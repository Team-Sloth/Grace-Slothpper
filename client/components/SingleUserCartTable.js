import React from 'react';

const SingleUserCartTable = props => {
  console.log(props);
  return (
    <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Delete</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        {props.cart &&
          props.cart.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price / 100}</td>
              <td>{item['lineItem.quantity']}</td>
              <td>{item.price / 100 * item['lineItem.quantity']}</td>
              <td>
                <button>Remove Item</button>
              </td>
              <td>
                <button>Update</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SingleUserCartTable;
