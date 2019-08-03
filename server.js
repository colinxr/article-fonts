const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes');
require('dotenv').config({ path: 'variables.env' })

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000;  

app.get('/api', routes.api)

app.get('/api/:font', routes.fonts)

app.listen(port, () => {
    console.log(`Express running -> PORT ${port}`)
})