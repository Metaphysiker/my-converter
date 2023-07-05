const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
const port = 8081

app.get('/', async (req, res) => {

  try {
    fetch('http://webp-converter:3000')
      .then(response => response.json())
      .then(json => console.log(json))
  } catch (error) {
    // TypeError: Failed to fetch
    console.log('There was an error', error);
  }

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
