import Vue from 'vue';
import VueFilterDateFormat from 'vue-filter-date-format';
import Toasted from 'vue-toasted';
import SearchBar from './components/SearchBar';

const SignupForm = () =>
  import(/* webpackChunkName: "user-login" */ './auth/SignupForm');
const LoginForm = () =>
  import(/* webpackChunkName: "user-signup" */ './auth/LoginForm');

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

Vue.component('searchBar', SearchBar);
Vue.component('signupForm', SignupForm);
Vue.component('loginForm', LoginForm);

const app = new Vue({
  el: '#app'
});
