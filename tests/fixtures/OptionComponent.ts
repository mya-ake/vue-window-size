import { defineComponent } from 'vue-demi';

export default defineComponent({
  template: `
  <div>
    <div id="width">{{ windowWidth }}</div>
    <div id="height">{{ windowHeight }}</div>
  </div>
  `,
});
