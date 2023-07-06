const express = require('express')
const app = express()
var cors = require('cors')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const _ = require('lodash');

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
          image.mv('./shared-volume/' + image.name);
          var response = await fetch("http://webp-converter:3000/convert_image", {
            method: "POST",
            body: JSON.stringify({imageName: image.name}),
            headers: {
              "Content-Type": "application/json",
            },
          })

          response.json().then((result) => {
            console.log(result);

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
