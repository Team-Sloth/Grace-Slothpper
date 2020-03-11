import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {getOrderData} from '../store';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class AdminOrders extends Component {
  componentWillMount() {
    this.props.getOrderData();
    console.log('admin orders ', this.props);
  }
  render() {
    const {adminOrderData} = this.props;

    return !adminOrderData.length ? (
      <h5>There is no historical order data to review.</h5>
    ) : (
      <section>
        <Fragment>
          <Dashboard adminOrderData={adminOrderData} />
          {adminOrderData.length &&
            adminOrderData.map(order => (
              <OrderTable key={order.id} order={order} />
            ))}
        </Fragment>
      </section>
    );
  }
}

const styles = {
  table: {
    minWidth: '500px',
    maxWidth: '700px',
    margin: 'auto'
  },
  display: {
    margin: '0 auto',
    width: 'fit-content',
    color: '#208c50'
  },
  tableHead: {
    background: '#538683'
  }
};

const round = numb => Number(Math.round(numb + 'e' + 2) + 'e-' + 2);
const getOrderTotal = arr => {
  if (!arr.length) return 0;
  const result = arr.reduce((sum, p) => {
    return sum + p.lineItem.quantity * p.lineItem.soldPrice / 100;
  }, 0);
  return round(result);
};

const Dashboard = ({adminOrderData}) => {
  const totalSales = orders => {
    console.log(orders.length, orders);
    return orders.reduce((total, order) => {
      return total + getOrderTotal(order.products);
    }, 0);
  };
  return (
    <section>
      <h4 style={styles.display}>
        Total sales are : <span>{totalSales(adminOrderData)}</span>
      </h4>
    </section>
  );
};

const OrderTable = props => {
  const {order} = props;

  return (
    <TableContainer style={styles.table} component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={styles.tableHead}>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.products.map(p => (
            <TableRow key={p.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{order.userId}</TableCell>
              <TableCell align="right">{p.lineItem.quantity}</TableCell>
              <TableCell align="right">
                ${round(p.lineItem.soldPrice / 100)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapState = state => {
  return {
    adminOrderData: state.adminOrderData
  };
};

const mapDispatch = dispatch => {
  return {
    getOrderData: userId => dispatch(getOrderData(userId))
  };
};

export default connect(mapState, mapDispatch)(AdminOrders);
