const FileRenamer = require("./FileRenamer.js");
const { exec } = require('child_process');


class WebpConverter {
    constructor() {
    }

    convertFileToWebp(fileName){
        console.log("convertFileToWebp")
        return new Promise(function(final_resolve, final_reject){
            const fileRenamer = new FileRenamer();
            const newFileName = fileRenamer.getFileNameWithWebpExtension(fileName);
            exec(`convert ${fileName} ${newFileName}`, {cwd: '/code/express/shared-volume'}, (err, stdout, stderr) => {
                if (err) {
                    final_reject(stderr);
                }
                final_resolve(newFileName);
            });
        })
    }
  }

  module.exports = WebpConverter
