import React, {Fragment} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Swal from 'sweetalert2';

const StripeButton = ({name, description, amount, disabled, handleOrder}) => {
  const publishableKey = 'pk_test_QGnJrXZhIjT3yjaGH7uhphH3000XV2w3gY';
  const onToken = async token => {
    const body = {
      token: token
    };
    try {
      await handleOrder();
      const response = await axios.post('/payment', body);
      console.log(response);
      Swal.fire({
        title: 'Success!',
        text: `Total Paid: $${amount / 100}`,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true
      });
    } catch (error) {
      console.log('Payment Error: ', error);
      Swal.fire({
        title: 'Payment Error',
        text: `Not Charged: ${amount}`,
        icon: 'failure',
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  return (
    <StripeCheckout
      label="Purchase with Stripe" //Component button text
      name={name} //Modal Header
      description="Finalize your checkout today!"
      panelLabel="Final Total" //Submit button in modal
      amount={amount} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      billingAddress={false}
      disabled={disabled}
      handleOrder={handleOrder}
    />
  );
};

export default StripeButton;
