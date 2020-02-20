<template>
  <div class="mb-xl">
    <div class="flex align-items-center">
      <h1 class="text-medium mr-l">Products</h1>
      <router-link
        to="/add"
        class="btn btn-primary btn-sm flex align-items-center"
      >
        <i class="material-icons">add</i>
        <span>New</span>
      </router-link>
    </div>

    <product-list></product-list>
  </div>
</template>

<script>
import ProductList from './ProductList';

export default {
  components: { ProductList },
  data() {
    return {};
  }
};
</script>
