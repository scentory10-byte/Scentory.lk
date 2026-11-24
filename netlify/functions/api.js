const serverless = require('serverless-http');
const express = require('express');
const app = require('../../server/server');

// Support both /api/* (direct or redirected) and /.netlify/functions/api/*
const serverlessApp = express();
serverlessApp.use('/.netlify/functions/api', app);
serverlessApp.use('/api', app);
serverlessApp.use('/', app);

module.exports.handler = serverless(serverlessApp);
