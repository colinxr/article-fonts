const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
require('dotenv').config({ path: 'variables.env' });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

const port = process.env.PORT || 3001; 

app.get('/', routes.client)
app.get('/api/:font', routes.fontHandler)

app.listen(port, () => {
    console.log(`Express running -> PORT ${port}`)
  })