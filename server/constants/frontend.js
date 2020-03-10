const FRONTEND_DEV_URLS = ['http://localhost:8080'];
const FRONTEND_PROD_URLS = [
  'http://grace-slothpper.herokuapp.com/',
  'https://grace-slothpper.herokuapp.com/'
];
module.exports =
  process.env.NODE_ENV === 'production'
    ? FRONTEND_PROD_URLS
    : FRONTEND_DEV_URLS;
