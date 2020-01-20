import Vue from 'vue';

import HelloWorld from './HelloWorld';
import SignupForm from './auth/SignupForm';
import LoginForm from './auth/LoginForm';
import CsrfInput from './components/CsrfInput';

Vue.component('csrfInput', CsrfInput);
Vue.component('helloWorld', HelloWorld);
Vue.component('signupForm', SignupForm);
Vue.component('loginForm', LoginForm);

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
