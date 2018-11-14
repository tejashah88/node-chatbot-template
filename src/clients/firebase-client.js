'use strict';

require('dotenv').config();

const checkEnvVar = require('../check-env-var');
const firebaseAdmin = require('firebase-admin');

const credsFileLocation = checkEnvVar('FIREBASE_CREDS_FILE');
const serviceAccount = require(credsFileLocation);

const fbApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

const firestore = fbApp.firestore();

// Needed to hide the following warning: "The behavior for Date objects stored in Firestore is going to change
// AND YOUR APP MAY BREAK...With this change, timestamps stored in Cloud Firestore will be read back as Firebase
// Timestamp objects instead of as system Date objects."
firestore.settings({
  timestampsInSnapshots: true
});

// Used to properly terminate the firebase app upon shutdown
const diehard = require('diehard');
diehard.register(done => fbApp.delete().then(done));
diehard.listen();

module.exports = firestore;