<script setup>
import { ref, onMounted } from "vue";
import UploadImage from "./UploadImage.vue";
import ImageCard from "./ImageCard.vue";

import FileService from "../services/FileService.js";

const fileService = new FileService();
const number_of_files = ref(0);
const uploadImageComponentCount = ref(1);
const quality = ref(75);
const fileNames = ref([]);

onMounted(() => {
  updateNumberOfFiles();
  getFileNames();
});

const updateQuality = (event) => {
  quality.value = event.target.value;
};

function updateNumberOfFiles() {
  fileService.getNumberOfFiles().then((json) => {
    number_of_files.value = json.number_of_files;
  });
}

function fileUploaded() {
  updateNumberOfFiles();
  getFileNames();
}

function getFileNames() {
  fileService.getFileNames().then((json) => {
    fileNames.value = json.fileNames;
  });
}

function removeAllFiles() {
  fileService.removeAllFiles().then(() => {
    updateNumberOfFiles();
    getFileNames();
  });
}
</script>

<template>
  <div class="container my-5">
    <div class="card">
      <div class="card-body">
        <p>Number of files: {{ number_of_files }}</p>
        <button @click="removeAllFiles" class="btn btn-danger">
          Delete all files
        </button>
        <div class="mt-5">
          <input
            type="range"
            min="1"
            max="100"
            value="75"
            @input="updateQuality"
          />
          <p>quality: {{ quality }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-for="i in uploadImageComponentCount" :key="i">
    <UploadImage
      @fileUploaded="fileUploaded()"
      :quality="quality"
    ></UploadImage>
  </div>

  <div class="container">
    <div v-for="fileName in fileNames" :key="fileName">
      <ImageCard :fileName="fileName"></ImageCard>
    </div>
  </div>

</template>
