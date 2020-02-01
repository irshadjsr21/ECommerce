import Vue from 'vue';

import SearchBar from './components/SearchBar';

const SignupForm = () =>
  import(/* webpackChunkName: "user-login" */ './auth/SignupForm');
const LoginForm = () =>
  import(/* webpackChunkName: "user-signup" */ './auth/LoginForm');

const CategoryHome = () =>
  import(/* webpackChunkName: "admin-category" */ './admin/category/Home');

Vue.component('searchBar', SearchBar);
Vue.component('signupForm', SignupForm);
Vue.component('loginForm', LoginForm);
Vue.component('categoryHome', CategoryHome);

const app = new Vue({
  el: '#app'
});
