import Vue from 'vue';

export default Vue.extend({
  template: `
  <div>
    <div id="width">{{ windowWidth }}</div>
    <div id="height">{{ windowHeight }}</div>
  </div>
  `,
});
