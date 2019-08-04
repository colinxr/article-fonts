const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes');
const axios = require('axios')
require('dotenv').config({ path: 'variables.env' })

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000; 

app.get('/', (req, res) => {
  res.send('Hey Now!')
})

app.get('/api/:font', async (request, result) => {
    const fileName = request.params.font
    let url = `https://api.github.com/search/code\?q\=+filename:${fileName}`
    
    if (request.query.ext.length) {
      console.log('firing')

      const exts = request.query.ext.split(' ')
      const extStr = exts.map(ext => {
        return `+extension:${ext}`
      }).join('')
      
      url = url + extStr
    }
  
    const headers = { 
      headers: { Authorization: `token ${process.env.GH_TOKEN}` }
      // headers: { Authorization: `token a7ae4d62ffe62b18ec35c4bfe49f8c0da91dc9c3` }
    }
  
    await axios.get(url, headers)
      .then(resp => {
        const extArr = request.query.ext.split(' ')

        const filteredItems = extArr.map(ext => {
          return resp.data.items.find(item => item.name.includes(ext))
        })

        return filteredItems
      })
      .then(filteredItems => {
        return filteredItems.map(item => {
          const { name, html_url } = item
          return { name: name, src: `${html_url}?raw=true` }
        })
      })
      .then(items => result.send(items))
      .catch(error => result.send(error))  
  })

app.listen(port, () => {
    console.log(`Express running -> PORT ${port}`)
})