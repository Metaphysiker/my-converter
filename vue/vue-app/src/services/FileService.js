class FileService {
    constructor() {
        this.baseUrl = "http://localhost:8081/";
    }

    getNumberOfFiles(){
        let self = this;
        return new Promise(function(final_resolve){
            fetch(self.baseUrl + "number_of_files", {
                method: "GET",
              }).then((response) => response.json())
              .then((json) => {
                {
                final_resolve(json);
              }
              })
        })
    }

    getFileNames(){
      let self = this;
      return new Promise(function(final_resolve){
          fetch(self.baseUrl + "get_file_names", {
              method: "GET",
            }).then((response) => response.json())
            .then((json) => {
              {
              final_resolve(json);
            }
            })
      })
  }

    removeFile(fileData){
        let self = this;
        return new Promise(function(final_resolve){
            var formData = new FormData();
            formData.append("fileName", fileData.fileName);

            fetch(self.baseUrl + "remove_file", {
                method: "POST",
                body: formData
              }).then((response) => response.json())
              .then((json) => {
                {
                final_resolve(json);
              }
              })
        })
    }

    removeAllFiles(){
        let self = this;
        return new Promise(function(final_resolve){
            fetch(self.baseUrl + "remove_all_files", {
                method: "GET",
              }).then((response) => response.json())
              .then((json) => {
                {
                final_resolve(json);
              }
              })
        })
    }
  }

  module.exports = FileService
