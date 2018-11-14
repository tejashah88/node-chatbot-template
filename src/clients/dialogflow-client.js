'use strict';

require('dotenv').config();

const checkEnvVar = require('../check-env-var');

const projectId = checkEnvVar('DIALOGFLOW_PROJECT_ID');
const sessionId = checkEnvVar('DIALOGFLOW_SESSION_ID');
const LANG_CODE = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// Ask the Dialogflow bot with a given query
async function askDialogflow(query) {
  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: LANG_CODE,
      },
    },
  };

  let responses = await sessionClient.detectIntent(request);
  return responses[0].queryResult;
}

// Invoke a specific intent in the Dialogflow bot via an event name
async function invokeDialogflowEvent(eventName) {
  let request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: eventName,
        languageCode: LANG_CODE,
      },
    },
  };

  let responses = await sessionClient.detectIntent(request);
  return responses[0].queryResult;
}

module.exports = { askDialogflow, invokeDialogflowEvent };
