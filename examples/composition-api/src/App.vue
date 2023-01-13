<script setup lang="ts">
import { useWindowSize } from 'vue-window-size';

const { width: windowWidth, height: windowHeight } = useWindowSize();
</script>

<template>
  <div>
    <p>width: {{ windowWidth }}</p>
    <p>height: {{ windowHeight }}</p>
  </div>
</template>
