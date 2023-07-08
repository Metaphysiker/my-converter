<script setup>
import { defineProps } from "vue";

const props = defineProps({
  fileName: {
    type: String,
  },
});
</script>

<template>
<div class="card my-3">
  <div class="row g-0">
    <div class="col-md-4">
      <div class="card-body">
        <h5 class="card-title">{{ props.fileName }}</h5>
      </div>
    </div>
    <div class="col-md-8">
      <img v-bind:src="'http://localhost:8081/shared-volume/' + props.fileName" class="img-fluid rounded-start" alt="...">>
    </div>
  </div>
</div>
</template>
