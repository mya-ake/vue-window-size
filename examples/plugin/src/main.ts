import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { VueWindowSizePlugin } from 'vue-window-size/option-api';

createApp(App).use(VueWindowSizePlugin).mount('#app');
