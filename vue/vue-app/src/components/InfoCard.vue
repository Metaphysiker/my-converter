<script setup>
import { ref } from 'vue'
const greeting = ref('Hello World!')
</script>

<template>
    <div class="container">
        <div class="text-center">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">My Converter</h5>
                <p class="greeting">{{ greeting }}</p>

                <p class="card-text">Convert images to webp and videos to webm.</p>
            </div>
        </div>
    </div>
    </div>
</template>
