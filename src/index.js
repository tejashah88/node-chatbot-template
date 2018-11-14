'use strict';

require('make-promises-safe');
require('dotenv').config();

const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const { WebhookClient } = require('dialogflow-fulfillment');

const { createServer } = require('./clients/express-server.js');

// Firestore object for interacting with firestore. COMMENT OUT IF YOU DON'T NEED IT
const firestore = require('./clients/firebase-client.js');

// Helper methods for interacting with your dialogflow bot. COMMENT OUT IF YOU DON'T NEED IT
const { askDialogflow, invokeDialogflowEvent } = require('./clients/dialogflow-client.js');

// Heroku uses the PORT env to bind the server to automatically
const PORT = process.env.PORT || 8080;

// Used for processing dialogflow intents via the webhook
const intentMap = require('./action-handlers');

const apiRouter = express.Router();

// ADD ENDPOINTS BELOW ME

// Example Dialogflow webhook endpoint
// The bot can be called by dialogflow via <hosted-url>/api/chat
apiRouter.post('/chat', (req, res) => {
  let agent = new WebhookClient({ request: req, response: res });
  console.log(`Executing action ${agent.action}...`);
  agent.handleRequest(intentMap);
});

// Example endpoint for invoking an intent via an event
// Go to <hosted-url>/api/invoke-event?event=<event-name> on your web browser
apiRouter.get('/invoke-event', async (req, res) => {
  let botResponse = await invokeDialogflowEvent(req.query.event);
  return res.json(botResponse);
});

// Example endpoint for invoking an intent via a query
// Go to <hosted-url>/api/ask-bot?query=<query-input> on your web browser
apiRouter.get('/chat-ask-bot', async (req, res) => {
  let botResponse = await askDialogflow(req.query.query);
  return res.json(botResponse);
});

// ADD ENDPOINTS ABOVE ME

const server = createServer(apiRouter);
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
