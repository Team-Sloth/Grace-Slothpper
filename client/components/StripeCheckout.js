import React, {Fragment} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeButton = ({name, description, amount}) => {
  // const publishableKey = "pk_test_QGnJrXZhIjT3yjaGH7uhphH3000XV2w3gY";

  const STRIPE_PUBLISH_KEY = process.env.STRIPE_PUBLISH_KEY;

  const onToken = token => {
    const body = {
      token: token
    };
    axios
      .post('http://localhost:8080/payment', body)
      .then(response => {
        console.log(response);
        alert('Payment Success');
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert('Payment Error');
      });
  };

  return (
    <StripeCheckout
      label="Purchase with Stripe" //Component button text
      name={name} //Modal Header
      description="Finalize your checkout today!"
      panelLabel="Final Total" //Submit button in modal
      amount={amount} //Amount in cents $9.99
      token={onToken}
      stripeKey={STRIPE_PUBLISH_KEY}
      billingAddress={false}
    />
  );
};

export default StripeButton;
