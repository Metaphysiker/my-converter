const express = require('express')
const app = express()
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const path = require("path");
const WebpConverter = require("./classes/WebpConverter.js");
const fs = require('fs');
var cors = require('cors');
app.use(cors())
app.use(bodyParser.json());
const port = 3000

app.get('/', (req, res) => {
  exec('identify -version', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
  });
  res.json({
    message: "swag"
  })
})

app.post('/convert_image', (req, res) => {
  console.log("convert_image");
  console.log("req body:")
  console.log(req.body);
  const webpConverter = new WebpConverter();
  webpConverter.convertFileToWebp(req.body.fileName, req.body.quality)
  .then((result) => {
    res.json({
      message: "success",
      new_file_name: result
    })
  },
  (error) => {
    console.log("error");
    res.json({
      message: error,
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
