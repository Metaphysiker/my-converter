<script setup>
import { ref } from 'vue'

const imageSource = ref("");

function fileAdded(event){
  postImageToBackend(event.target.files[0])
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
  .then((response) => response.json())
  .then((json) => {
    {
    imageSource.value = json.new_file_name;
    final_resolve(json);
  }
  })



})
}
</script>

<template>
    <div class="container">
      <div class="card my-2">
      <div class="card-body">
        <div class="row">
            <div class="col-6">
                <input @change="fileAdded" type="file" name="image" id="image" accept="image/png, image/jpeg, image/webp, image/gif">
            </div>
            <div class="col-6">
              <div v-if="imageSource">
                <img v-bind:src="'http://localhost:8081/shared-volume/' + imageSource" style="width:100%;">
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
</template>
