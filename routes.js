const axios = require('axios')
// Do work here
exports.api = (req, res) => {
  res.json({ message: 'api is working' })
};

exports.fonts = async (req, res) => {
  const fileName = req.params.font
  const exts = req.query.ext.split(' ')
  const extStr = exts.map(ext => {
    return `+extension:${ext}`
  }).join('')

  const url = `https://api.github.com/search/code\?q\=+filename:${fileName}${extStr}`

  const headers = { 
    headers: { Authorization: `token ${process.env.GH_TOKEN}` }
  }

  await axios.get(url, headers)
    .then(resp => {
      console.log(resp.data.items)
      return resp.data.items.map(item => {
        return {
          name: item.name,
          src: `${item.html_url}?raw=true`,
        }
      })
    })
    .then(data => {
      console.log(data)
      res.json({ data: data })
    })
    .catch(error => res.json({ msg: error }))  
}