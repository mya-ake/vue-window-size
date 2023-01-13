<script lang="ts">
import { defineComponent } from 'vue';
import { vueWindowSizeMixin } from 'vue-window-size/option-api'

export default defineComponent({
  mixins: [vueWindowSizeMixin()]
})
</script>

<template>
  <div>
    <p>width: {{ $windowWidth }}</p>
    <p>height: {{ $windowHeight }}</p>
  </div>
</template>
