const express = require('express')
const app = express()
const { exec } = require('child_process');
var cors = require('cors')
app.use(cors())
const port = 3000

app.get('/', (req, res) => {
  console.log("swwwwwwwwwwwwwwwaaaaaaaaaaaaaaggg")
  exec('identify -version', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }

    console.log(`${stdout}`);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
