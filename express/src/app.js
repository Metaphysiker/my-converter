const express = require('express')
const app = express()
var cors = require('cors')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const _ = require('lodash');
const FileRenamer = require("./classes/FileRenamer.js");
const FileStatsGetter = require("./classes/FileStatsGetter.js");
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

app.get('/remove_all_files', async (req, res) => {
  fs.readdir('./shared-volume/', (error, files) => {
    if (error) {
      console.log(error);
      res.send({
        status: false,
        message: error
    });
    } else {
      for (const file of files) {
        fs.unlink('./shared-volume/' + file, (err) => {
          if (err) throw err;
        });
      }
      res.send({
        status: true,
        message: "files have been removed."
    });
    }
  });
})

app.get('/number_of_files', async (req, res) => {
  fs.readdir('./shared-volume/', (error, files) => {
    if (error) {
      res.send({
        status: false,
        message: error
    });
    } else {
      res.send({
        status: true,
        number_of_files: files.length
    });
    }
  });
})

app.get('/get_file_names', async (req, res) => {
  let fileNames = [];
  let fileStatsGetter = new FileStatsGetter();
  fs.readdir('./shared-volume/', (error, fileNamesInDir) => {
    if (error) {
      res.send({
        status: false,
        message: error
    });
    } else {
      for(fileName of fileNamesInDir){
        fileNames.push(fileName);
      }
      res.send({
        status: true,
        fileNames: fileNames
    });
    }
  });
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
          let imageName = image.name;
          let fileRenamer = new FileRenamer()
          imageName = fileRenamer.constructAvailableNameForFile(imageName);
          image.mv('./shared-volume/' + imageName);

          var response = await fetch("http://webp-converter:3000/convert_image", {
            method: "POST",
            body: JSON.stringify({imageName: imageName, quality: req.body.quality}),
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

app.post('/upload_images', async (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {

          let fileNames = [];

          let object_keys = Object.keys(req.files);
          for(object_key of object_keys){
            let file = req.files[object_key];
            let fileName = file.name;
            let fileRenamer = new FileRenamer()
            fileName = fileRenamer.constructAvailableNameForFile(fileName);
            file.mv('./shared-volume/' + fileName);
            var response = await fetch("http://webp-converter:3000/convert_image", {
              method: "POST",
              body: JSON.stringify({fileName: fileName, quality: req.body.quality}),
              headers: {
                "Content-Type": "application/json",
              },
            })

            response.json().then((result) => {
              fileNames.push(result.new_file_name);

              fs.unlink('./shared-volume/' + fileName, function(err){
                if (err) throw err;
                console.log('file deleted.');
              });
            })

          }

          //send response
          res.send({
            status: true,
            message: 'Files are uploaded',
            new_file_names: fileNames
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
