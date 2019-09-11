import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify';
import theme from '../../../constants/theme';

export const installVuetify = () => {
  Vue.use(Vuetify, {
    theme, iconfont: 'md'
  });
};
