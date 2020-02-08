import VueRouter from 'vue-router';
const CategoryHome = () =>
  import(/* webpackChunkName: "admin-category-home" */ './Home');

export default new VueRouter({
  base: '/admin/categories',
  mode: 'history',
  routes: [
    {
      path: '/',
      component: CategoryHome
    },
    {
      path: '*',
      component: { template: '<h2 class="text-medium">Page not found.</h2>' }
    }
  ]
});
