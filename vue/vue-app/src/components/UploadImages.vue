<script setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps({
  quality: {
    type: Number,
    default: 75,
  },
});

const emit = defineEmits(["fileUploaded"]);

const imageSource = ref("");
const fileInput = ref(null)


function fileAdded(event) {
  postImageToBackend(event.target.files);
}

function postImageToBackend(files) {
  console.log(files);
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
          console.log(json);
          //imageSource.value = json.new_file_name;
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
          <div class="col-6">
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
          <div class="col-6">
            <div v-if="imageSource">
              <img
                v-bind:src="
                  'http://localhost:8081/shared-volume/' + imageSource
                "
                style="width: 100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
