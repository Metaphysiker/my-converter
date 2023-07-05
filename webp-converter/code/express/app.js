const express = require('express')
const app = express()
const { exec } = require('child_process');
var cors = require('cors')
app.use(cors())
const port = 3000

app.get('/', (req, res) => {
  exec('identify -version', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }

    console.log(`${stdout}`);
  });
  res.json({
    message: "swag"
  })
})

app.post('/convert_image', async (req, res) => {
  console.log(req.body)
  res.json({
    message: "reqy"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
