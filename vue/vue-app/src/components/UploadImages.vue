<script setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps({
  quality: {
    type: Number,
    default: 75,
  },
});

const emit = defineEmits(["fileUploaded"]);
const fileInput = ref(null)


function fileAdded(event) {
  postImageToBackend(event.target.files);
}

function postImageToBackend(files) {
  return new Promise(function (final_resolve) {
    var formData = new FormData();
    if (files) {
      //TODO maybe add here
      formData.append("files", files);
      for (let i = 0; i < files.length; i++) {
        formData.append("files" + i, files[i])
      }

      formData.append("quality", props.quality);
    }

    fetch("http://localhost:8081/upload_images", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        {
          emit("fileUploaded");
          final_resolve(json);
        }
      });
  });
}
</script>

<template>
  <div class="container">
    <div class="card my-2">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <input
              @change="fileAdded"
              ref="fileInput"
              type="file"
              name="files"
              id="files"
              accept="image/png, image/jpeg, image/webp, image/gif"
              multiple
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
