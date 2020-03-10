const router = require('express').Router();
const stripe = require('../constants/stripe');

const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr});
  } else {
    res.status(200).send({success: stripeRes});
  }
};

const paymentApi = app => {
  router.get('/', (req, res) => {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString()
    });
  });

  router.post('/', (req, res) => {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: 'usd'
    };
    stripe.charges.create(body, stripeChargeCallback(res));
  });

  return app;
};

module.exports = paymentApi;
