const configureStripe = require('stripe');
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
