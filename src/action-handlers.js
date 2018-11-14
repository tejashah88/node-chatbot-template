'use strict';

require('dotenv').config();

const { Card, Suggestion } = require('dialogflow-fulfillment');
const { Carousel } = require('actions-on-google');

const firestore = require('./clients/firebase-client.js');

// ADD INTENT HANDLERS BELOW ME

function helloWorld(agent) {
  agent.add(`Hello world!`);
}

function addNumbers(agent) {
  let { number1, number2 } = agent.parameters;
  let result = number1 + number2;
  agent.add(`Adding ${number1} and ${number2} gives ${result}.`);
}

// ADD INTENT HANDLERS ABOVE ME

let intentMap = new Map();

// add intent handler mappings here
intentMap.set('hello world', helloWorld);
intentMap.set('add numbers', addNumbers);

module.exports = intentMap;
