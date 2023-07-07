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
