<script lang="ts">
import { defineComponent } from 'vue';
import { vueWindowSizeMixin, vueWindowSizeAPI } from 'vue-window-size-mixin';

export default defineComponent({
  mixins: [vueWindowSizeMixin()],
});
</script>

<template>
  <div>
    <p>width: {{ $windowWidth }}</p>
    <p>height: {{ $windowHeight }}</p>
  </div>
</template>
