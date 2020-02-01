import Vue from 'vue';

import csrfToken from './csrfToken';
import SignupForm from './auth/SignupForm';
import LoginForm from './auth/LoginForm';
import CsrfInput from './components/CsrfInput';
import SearchBar from './components/SearchBar';
import InputBox from './components/InputBox';
import SelectBox from './components/SelectBox';
import RadioInput from './components/RadioInput';
const AddCategory = () =>
  import(/* webpackChunkName: "admin" */ './admin/category/AddCategory');
const CategoryHome = () =>
  import(/* webpackChunkName: "admin" */ './admin/category/Home');

Vue.component('csrfInput', CsrfInput);
Vue.component('signupForm', SignupForm);
Vue.component('loginForm', LoginForm);
Vue.component('searchBar', SearchBar);
Vue.component('inputBox', InputBox);
Vue.component('selectBox', SelectBox);
Vue.component('radioInput', RadioInput);
Vue.component('addCategoryForm', AddCategory);
Vue.component('categoryHome', CategoryHome);

const app = new Vue({
  el: '#app'
});
