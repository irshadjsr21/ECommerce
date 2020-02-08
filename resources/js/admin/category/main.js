import Vue from 'vue';
import Toasted from 'vue-toasted';
import VueFilterDateFormat from 'vue-filter-date-format';
import VueRouter from 'vue-router';
import Router from './router';

Vue.use(VueRouter);
Vue.use(Toasted, {
  position: 'bottom-left',
  keepOnHover: true,
  closeOnSwipe: true,
  iconPack: 'material',
  duration: 5000,
  action: {
    icon: 'close',
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    }
  }
});
Vue.use(VueFilterDateFormat);

new Vue({
  el: '#app',
  router: Router
});
