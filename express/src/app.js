const express = require('express')
const app = express()
var cors = require('cors')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const _ = require('lodash');
const FileRenamer = require("./classes/FileRenamer.js");
const fs = require('fs')
app.use(cors());
// enable files upload
app.use(fileUpload({
  createParentPath: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/shared-volume', express.static('/app/shared-volume'))
app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 8081

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.post('/upload_image', async (req, res) => {
  console.log("upload_image")
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
          let image = req.files.image;
          //Use the mv() method to place the file in the upload directory (i.e. "uploads")
          let imageName = image.name;
          let fileRenamer = new FileRenamer()
          imageName = fileRenamer.constructAvailableNameForFile(imageName);
          image.mv('./shared-volume/' + imageName);

          var response = await fetch("http://webp-converter:3000/convert_image", {
            method: "POST",
            body: JSON.stringify({imageName: imageName}),
            headers: {
              "Content-Type": "application/json",
            },
          })

          response.json().then((result) => {
              fs.unlink('./shared-volume/' + imageName, function(err){
                if (err) throw err;
                console.log('file deleted.');
              });
              //send response
              res.send({
                status: true,
                message: 'File is uploaded',
                new_file_name: result.new_file_name
            });
          },
          (error) => {
            res.status(500).send(err);
          })
      }
  } catch (err) {
      res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
