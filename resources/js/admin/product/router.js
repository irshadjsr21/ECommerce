import VueRouter from 'vue-router';
const ProductHome = () =>
  import(/* webpackChunkName: "admin-product-home" */ './Home');
const AddProduct = () =>
  import(/* webpackChunkName: "admin-product-add" */ './AddProduct');

export default new VueRouter({
  base: '/admin/products',
  mode: 'history',
  routes: [
    {
      path: '/',
      component: ProductHome
    },
    {
      path: '/add',
      component: AddProduct
    },
    {
      path: '*',
      component: { template: '<h2 class="text-medium">Page not found.</h2>' }
    }
  ]
});
