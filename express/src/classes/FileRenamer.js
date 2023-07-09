const path = require("path");
const fs = require('fs')

class FileRenamer {
    constructor() {
    }

    constructAvailableNameForFile(fileName){
        let extension = path.extname(fileName)
        let appendix = 0;
        fileName = this.stringParameterize(fileName)
        console.log("swag")
        console.log(fileName);
        let newFileName = this.constructNewFileName(fileName, appendix, extension);
        while (this.doesFileAlreadyExist(newFileName)) {
            appendix += 1;
            newFileName = this.constructNewFileName(fileName, appendix, extension);
          }

        return newFileName;
    }

    constructNewFileName(fileName, appendix, extension){
        return path.parse(fileName).name + appendix + extension;
    }

    doesFileAlreadyExist(fileName){
        return fs.existsSync('./shared-volume/' + fileName)
    }

    stringParameterize = function (str1) {
        return str1.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-");
    };

  }

  module.exports = FileRenamer
