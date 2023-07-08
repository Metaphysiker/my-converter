const path = require("path");
const fs = require('fs')

class FileStatsGetter {
    constructor() {
    }
    async getFileStats(fileName){

        const filePath = './shared-volume/' + fileName;
        fs.stat(filePath, function(err,stats){
            if(!err){
               console.log(stats);
            }
         })
    }
  }

  module.exports = FileStatsGetter
