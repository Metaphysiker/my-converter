const express = require('express')
const app = express()
const { exec } = require('child_process');
const bodyParser = require('body-parser');
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json());
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

app.post('/convert_image', (req, res) => {
  console.log(req.body);
  console.log("SWWWAAAAAGGGG")
  exec(`ls`, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log(`${stdout}`);
  });

  exec(`cd shared-volume && convert ${req.body.imageName} new.webp`, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log(`${stdout}`);
  });

  res.json({
    message: "reqy"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
