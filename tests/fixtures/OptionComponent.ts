import { defineComponent } from 'vue';

export default defineComponent({
  template: `
  <div>
    <div id="width">{{ $windowWidth }}</div>
    <div id="height">{{ $windowHeight }}</div>
  </div>
  `,
});
