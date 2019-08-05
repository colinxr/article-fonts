const axios = require('axios')
// Do work here
exports.api = (req, res) => {
  res.json({ message: 'api is working' })
};

exports.client = (request, result) => {
  result.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
}

exports.fontHandler = async (request, result) => {
  const fileName = request.params.font
  let url = `https://api.github.com/search/code\?q\=+filename:${fileName}`
  
  if (request.query.ext.length) {
    const exts = request.query.ext.split(' ')
    const extStr = exts.map(ext => {
      return `+extension:${ext}`
    }).join('')
    
    url = url + extStr
  }

  const headers = { 
    // headers: { Authorization: `token ${process.env.GH_TOKEN}` }
    headers: { Authorization: `token a7ae4d62ffe62b18ec35c4bfe49f8c0da91dc9c3` }
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
}