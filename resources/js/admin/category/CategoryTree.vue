<template>
  <div class="card card-full">
    <h2 class="card-header">
      Category Tree
    </h2>

    <div class="card-body">
      <div class="flex justify-content-end">
        <button
          @click="getData"
          class="btn btn-primary flex align-items-center"
          :disabled="isLoading"
        >
          <i class="material-icons mr-4">
            refresh
          </i>
          <span>Refresh</span>
        </button>
      </div>

      <ul v-if="!isLoading" class="tree-list">
        <category-tree-item
          v-for="category of categories"
          :key="category.name"
          :category="category"
        ></category-tree-item>
      </ul>
      <div v-else>
        <div class="loader my-l"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryTreeItem from './CategoryTreeItem';
import { getCategories } from '../services/category';

export default {
  components: { CategoryTreeItem },
  data() {
    return {
      categories: [],
      isLoading: false
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.isLoading = true;
      getCategories({ level: 1 })
        .then(data => {
          this.categories = data.categories;
        })
        .catch(error => {
          this.$toasted.show(error.message, {
            icon: 'error',
            className: 'toast-error'
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
