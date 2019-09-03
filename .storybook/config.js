import { addDecorator, configure } from '@storybook/vue';
import Vue from "vue";
import Vuetify from "vuetify";
import { theme } from '../src/constants/theme';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader

Vue.use(Vuetify, {
  theme, iconfont: "md"
});

addDecorator(() => ({
  template: "<v-app><story/></v-app>"
}));

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
