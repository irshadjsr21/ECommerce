import Vue from 'vue';

import HelloWorld from './HelloWorld';
import SignupForm from './auth/SignupForm';
import LoginForm from './auth/LoginForm';

Vue.component('helloWorld', HelloWorld);
Vue.component('signupForm', SignupForm);
Vue.component('loginForm', LoginForm);

const app = new Vue({
  el: '#app'
});
