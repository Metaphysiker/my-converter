<script setup>
import { ref, onMounted } from 'vue'
import UploadImage from './UploadImage.vue'
import FileService from '../services/FileService.js';

const fileService = new FileService();
const number_of_files = ref(0)
let uploadImageComponentCount = ref(1);

onMounted(() => {
    updateNumberOfFiles();
})


function updateNumberOfFiles(){
    fileService.getNumberOfFiles()
    .then((json) => {
        number_of_files.value = json.number_of_files;
    });
}

function fileUploaded(){
    updateNumberOfFiles();
    uploadImageComponentCount.value++;
}

function removeAllFiles(){
    fileService.removeAllFiles()
    .then(() => {
        updateNumberOfFiles();
    })
}

</script>

<template>
    <div class="container my-5">
        <div class="card">
            <div class="card-body">
                <p>Number of files: {{ number_of_files }}</p>
                <button @click="removeAllFiles" class="btn btn-primary" >Delete all files</button>
            </div>
        </div>
    </div>

    <div v-for="i in uploadImageComponentCount" :key="i">
            <UploadImage @fileUploaded="fileUploaded()"></UploadImage>
        </div>
</template>
