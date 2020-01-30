import Vue from 'vue';

import SignupForm from './auth/SignupForm';
import LoginForm from './auth/LoginForm';
import CsrfInput from './components/CsrfInput';
import SearchBar from './components/SearchBar';
import InputBox from './components/InputBox';

Vue.component('csrfInput', CsrfInput);
Vue.component('signupForm', SignupForm);
Vue.component('loginForm', LoginForm);
Vue.component('searchBar', SearchBar);
Vue.component('inputBox', InputBox);

Vue.mixin({
  methods: {
    csrfToken: () => {
      const elem = document.querySelector('meta[name="csrf-token"]');
      if (!elem) {
        console.error('CSRF token not found.');
        return '';
      }
      return elem.getAttribute('content');
    }
  }
});

const app = new Vue({
  el: '#app'
});
