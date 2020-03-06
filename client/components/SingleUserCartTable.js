import React from 'react';

const SingleUserCartTable = props => {
  // handleSubmit(event) {
  //   const id = this.props.match.params.id;
  //   event.preventDefault();
  //   this.props.updateSingleUser(id, this.state);
  // }
  const handleItemUpdate = (evt, item) => {
    evt.preventDefault();
    props.itemUpdate(item);
  };

  const handleQuantityChange = evt => {
    props.handleChange(evt);
  };

  //console.log(props);
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
              <td>
                <label htmlFor="quantity">
                  <small>quantity</small>
                </label>
                <input
                  name="quantity"
                  placeholder={item['lineItem.quantity']}
                  type="number"
                  onChange={evt => handleQuantityChange(evt)}
                />
              </td>
              <td>{item.price / 100 * item['lineItem.quantity']}</td>
              <td>
                <button>Remove Item</button>
              </td>
              <td>
                <button onClick={evt => handleItemUpdate(evt, item)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SingleUserCartTable;
