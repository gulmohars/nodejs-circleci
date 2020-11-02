const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 8080;
const headerRequestIdTokenName = 'x-custom-client-nginx-request-id';

// Express route handlers

const basePath = '/api/v1/backend-service';
// const basePath = '';

app.get(basePath + '/', (req, res) => {
  res.send('Hi');
});
app.get(basePath + '/health', (req, res) => {
  res.send('I am healthy!!!!!!!!!!!!!!!');
});
app.get(basePath + '/value/:id', (req, res) => {
  const { id } = req.params;
  res.send('return - ' + id);
});

app.get(basePath + '/getSquare/:id', (req, res) => {
  const { id } = req.params;

  // console.log(`

  // requestHeader : ${JSON.stringify(req.headers)}

  // `);
  // console.log(`

  // requestHeader in rrrrrr : ${req.headers[headerRequestIdTokenName]}

  // `);

  res.setHeader('Content-Type', 'application/json');
  if (typeof req.headers[headerRequestIdTokenName] !== 'undefined') {
    res.setHeader('x-response-header-square', req.headers[headerRequestIdTokenName]);
  }
  const output = {};
  output[id] = id * id;

  res.send(output);
});

app.get(basePath + '/getCube/:id', (req, res) => {
  const { id } = req.params;

  res.setHeader('Content-Type', 'application/json');
  if (typeof req.headers[headerRequestIdTokenName] !== 'undefined') {
    res.setHeader('x-response-header-square', req.headers[headerRequestIdTokenName]);
  }

  const output = {};
  output[id] = id * id * id;

  res.send(output);
});

app.post(basePath + '/values', async (req, res) => {
  const index = req.body.index;

  console.log(`POST API INPUT -  : ${index}`);

  res.setHeader('Content-Type', 'application/json');
  if (typeof req.headers[headerRequestIdTokenName] !== 'undefined') {
    res.setHeader('x-response-header-square', req.headers[headerRequestIdTokenName]);
  }

  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high');
  }

  res.send({ index: index });
});

app.listen(PORT, () => console.log('App listening on port ' + PORT));
