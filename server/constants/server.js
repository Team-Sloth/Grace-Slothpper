const path = require('path');
const SERVER_PORT = 8080;
const SERVER_CONFIGS = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || SERVER_PORT
};
module.exports = SERVER_CONFIGS;

const cors = require('cors');
const bodyParser = require('body-parser');
const CORS_WHITELIST = require('./constants/frontend');
const corsOptions = {
  origin: (origin, callback) =>
    CORS_WHITELIST.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
};
const configureServer = app => {
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
};
module.exports = configureServer;
