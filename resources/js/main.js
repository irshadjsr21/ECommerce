import Vue from 'vue';
import Toasted from 'vue-toasted';

import SearchBar from './components/SearchBar';
import VueFilterDateFormat from 'vue-filter-date-format';

const SignupForm = () =>
  import(/* webpackChunkName: "user-login" */ './auth/SignupForm');
const LoginForm = () =>
  import(/* webpackChunkName: "user-signup" */ './auth/LoginForm');

const CategoryHome = () =>
  import(/* webpackChunkName: "admin-category" */ './admin/category/Home');

Vue.use(Toasted, {
  position: 'bottom-left',
  keepOnHover: true,
  closeOnSwipe: true,
  iconPack: 'material',
  // duration: 5000,
  action: {
    icon: 'close',
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    }
  }
});
Vue.use(VueFilterDateFormat);

Vue.component('searchBar', SearchBar);
Vue.component('signupForm', SignupForm);
Vue.component('loginForm', LoginForm);
Vue.component('categoryHome', CategoryHome);

const app = new Vue({
  el: '#app'
});
