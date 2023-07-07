<template>
    <div class="container">
        <div class="text-center">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">My Converter</h5>
                <p class="card-text">Convert images to webp</p>
            </div>
        </div>
    </div>
    </div>
</template>

<!--
Say Hello World with Vue!
-->

<script setup>
//import { ref } from 'vue'
// A "ref" is a reactive data source that stores a value.
// Technically, we don't need to wrap the string with ref()
// in order to display it, but we will see in the next
// example why it is needed if we ever intend to change
// the value.

import { onMounted } from 'vue'

onMounted(() => {

  console.log(`the component is now mounted.`)
  //hello();
})

/*
const hello = async () => {
    const response = await fetch("http://localhost:8081");
    response.text().then((message)=>{
        console.log(message);
    })
}
*/
</script>
