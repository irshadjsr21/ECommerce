import Vue from 'vue';

import SignupForm from './auth/SignupForm';
import LoginForm from './auth/LoginForm';
import CsrfInput from './components/CsrfInput';
import SearchBar from './components/SearchBar';
import InputBox from './components/InputBox';
import SelectBox from './components/SelectBox';
import RadioInput from './components/RadioInput';
const AddCategory = () =>
  import(/* webpackChunkName: "admin" */ './admin/category/AddCategory');

Vue.component('csrfInput', CsrfInput);
Vue.component('signupForm', SignupForm);
Vue.component('loginForm', LoginForm);
Vue.component('searchBar', SearchBar);
Vue.component('inputBox', InputBox);
Vue.component('selectBox', SelectBox);
Vue.component('radioInput', RadioInput);
Vue.component('addCategoryForm', AddCategory);

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
