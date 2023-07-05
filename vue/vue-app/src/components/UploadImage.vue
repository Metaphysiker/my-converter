<script setup>
//import { ref } from 'vue'

function uploadImage() {
    var fileField = document.getElementById("image");
    var firstFile = fileField.files[0];
    console.log(firstFile);
    postImageToBackend(firstFile)
}

function postImageToBackend(file){
return new Promise(function(final_resolve){

  var formData = new FormData();
  if(file){
    formData.append("image", file);
  }

  fetch("http://localhost:8081/upload_image", {
    method: "POST",
    body: formData
  })
  .then((response) => {
    console.log(response);
    final_resolve(response);
  })

})
}

</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <input type="file" name="image" id="image" accept="image/png, image/jpeg, image/webp, image/gif">
            </div>
            <div class="col-6">
                placeholder
            </div>
        </div>
    </div>
	<button @click="uploadImage">Upload</button>
</template>
