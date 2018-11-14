'use strict';

const express = require('express');

// allow async/await usage in express with proper error handling
require('express-async-errors');

// used for parsing JSON or URL encoded inputs
const bodyParser = require('body-parser');

// Avoid those CORS errors
const cors = require('cors');

// Enable fancy logging
const morgan = require('morgan');

function createServer(apiRouter, otherRouters = []) {
  const server = express();
  server.use(morgan('dev'));
  server.use(cors());

  // we mount the API router  separately, to avoid interference of any middleware
  apiRouter.use(bodyParser.json());
  server.use('/api', apiRouter);

  for (let { endpoint, router } of otherRouters)
    server.use(endpoint, router);

  // add error logging at the end
  server.use((error, req, res, next) => {
    console.log(error.stack);
    if (res.headersSent)
      return next(error);
    else
      return res.status(500).json({ error });
  });

  return server;
}

module.exports = { createServer };