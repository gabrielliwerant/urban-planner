import Vue from 'vue';
import App from './App.vue';
import {
  MdButton,
  MdField,
  MdSnackbar,
  MdCard,
  MdRipple,
} from 'vue-material/dist/components';

Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdSnackbar);
Vue.use(MdCard);
Vue.use(MdRipple);

new Vue({
  el: '#app',
  render: h => h(App)
});
