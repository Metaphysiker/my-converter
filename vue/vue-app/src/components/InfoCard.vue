<template>
    <div class="container">
        <div class="text-center">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">My Converter</h5>
                <p>
                    {{ message }}
                </p>
                <p class="card-text">Convert images to webp and videos to webm.</p>
            </div>
        </div>
    </div>
    </div>
</template>

<!--
Say Hello World with Vue!
-->

<script setup>
import { ref } from 'vue'
import _ from 'lodash';
// A "ref" is a reactive data source that stores a value.
// Technically, we don't need to wrap the string with ref()
// in order to display it, but we will see in the next
// example why it is needed if we ever intend to change
// the value.
const result = _.capitalize("mccrazy");
const message = ref('Hello World!')
console.log("swag");
console.log(result);
</script>
