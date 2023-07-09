const path = require("path");
const fs = require('fs')

class FileRenamer {
    constructor() {
    }

    getFileNameWithWebpExtension(fileName){
        let appendix = 0;
        let newFileName = this.constructNewFileName(fileName, appendix, ".webp");
        while (this.doesFileAlreadyExist(newFileName)) {
            appendix += 1;
            newFileName = this.constructNewFileName(fileName, appendix, ".webp");
          }
        return newFileName;
    }

    constructAvailableNameForFile(fileName){
        let extension = path.extname(fileName)
        let appendix = 0;
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

  }

  module.exports = FileRenamer
