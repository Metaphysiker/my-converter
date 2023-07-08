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
  postImageToBackend(event.target.files[0]);
}

function postImageToBackend(file) {
  return new Promise(function (final_resolve) {
    var formData = new FormData();
    if (file) {
      formData.append("image", file);
      formData.append("quality", props.quality);
    }

    fetch("http://localhost:8081/upload_image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        {
          imageSource.value = json.new_file_name;
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
              name="image"
              id="image"
              accept="image/png, image/jpeg, image/webp, image/gif"
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
