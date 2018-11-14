# node-chatbot-template
A template repo for quickly bootstrapping a Dialogflow-based chatbot ready to deploy to Heroku. This is intended for hackathons and NOT any means production ready.

## Features
* Express.js loaded with needed middleware (`body-parser`, `cors`, `multer`, and `morgan`)
* Full async/await support, thanks to `express-async-errors` and `make-promises-safe`
* Common libraries ready to be installed, including `axios`, `fs-extra`, `firebase-admin`, and `dialogflow`
* Helper functions for quick setup for express.js, firebase, and dialogflow
* Easy, CLI-based way of quickly making the `.env` file via `npm run env`
* If you have `ngrok` installed, run `npm run ngrok` to host your server to the world towards `localhost:8080` (or just run `ngrok http 8080`)
* ESLint integration to keep your code clean via `npm run lint` and `npm run lint-fix` (especially during hackathons)
  * Works best with an IDE plugin
* Ready to deploy to heroku

## Setup instructions
1. Select the + sign in the top right corner, and Import repository.
2. Import your forked repository. Within a minute or two, you should have a clone of this repo without the fork dependency.
3. Clone the newly made repository onto your computer via `git clone https://github.com/<username>/<project-name>.git`.
    * `<username>` - Your GitHub username
    * `<project-name>` - Project name you gave on GitHub
4. Change directory via `cd <project-name>`, using the aforementioned project name in place of `<project-name>`.
5. Run `npm install` to install all the dependencies.
6. Run `npm run env` to generate an .env file. You can skip some of the prompts if you don't intend on using some of them.
7. Whenever you are ready, type `npm start` to start the server.
8. If you want to expose it to the internet, you can by going to another command prompt in the same directory and typing `npm run ngrok` or alternatively `ngrok http 8080`.

### Environmental Variables
* `DIALOGFLOW_PROJECT_ID` - The project ID for Dialogflow Client
* `DIALOGFLOW_SESSION_ID` - Any random series of characters.
* `FIREBASE_CREDS_FILE` - The location of the firebase admin credentials file (relative to the root folder). MAKE SURE TO ADD THIS FILE TO YOUR `.gitignore`!

Note: If you are using heroku, be sure to go the `Settings` page and edit the environment variables there.

## Getting started
#### `index.js`
For the most part, you'll be using express's `Router` objects to mount endpoints to functions. By default, the `apiRouter` object mounts to `/api`.

For using dialogflow via a webhook interaction, the final endpoint will be `<hosting-url>/api/chat`. There are also some examples for invoking events and queries against the bot via the non-webhook integration.

If you don't need either firebase integration (line 15) or dialogflow non-webhook integration (line 18), comment them out, or you'll get an error about undefined process environmental variables. You may also need to check `action-handlers.js` since firestore is added there as well.

For using `invokeDialogflowEvent`, just specify the event name as defined in the target intent, and for using `askDialogflow`, just give a typical query string like 'How is your day?'.

#### `action-handlers.js`
This is where you'll be adding your fulfillment logic for your Dialogflow webhook handler. You are essentially building a `Map` where the key is the intent name and the value is the function to be called. The said function can be async if external resources are required to fulfill its function (pun intended) but you have a maximum of 5 seconds to respond back.

Each function will take an `agent` of type `WebhookClient` and doesn't return anything. Refer to the following link about the Webhook Client for more documentation about using it.

## Useful Links
* Firestore: https://firebase.google.com/docs/firestore/quickstart
* Dialogflow:
  * Fulfillment library: https://github.com/dialogflow/dialogflow-fulfillment-nodejs
  * Webhook Client: https://dialogflow.com/docs/reference/fulfillment-library/webhook-client
  * Request Format (JSON): https://dialogflow.com/docs/reference/agent/query#get_and_post_responses
  * Response Format: https://dialogflow.com/docs/reference/fulfillment-library/rich-responses
* express.js: https://expressjs.com/en/4x/api.html
* axios: https://github.com/axios/axios
* fs-extra: https://github.com/jprichardson/node-fs-extra