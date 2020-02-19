<template>
  <li>
    <button
      class="btn-reset flex align-items-center"
      @click="toggle"
      :disabled="isLoading"
    >
      <div class="mr-4">
        <i class="material-icons" v-if="isOpen">
          keyboard_arrow_down
        </i>
        <i class="material-icons" v-else>
          keyboard_arrow_right
        </i>
      </div>
      <div class="mr-4">
        {{ category.name }}
      </div>
      <div class="text-mute" v-if="category.subCategories">
        ({{ category.subCategories }})
      </div>
    </button>
    <ul class="tree-list" v-if="category.subCategories > 0 && isOpen">
      <category-tree-item
        v-for="subCategory of subCategories"
        :key="subCategory.name"
        :category="subCategory"
      ></category-tree-item>
    </ul>
  </li>
</template>

<script>
import { getCategories } from '../services/category';

export default {
  name: 'CategoryTreeItem',
  props: ['category'],
  data() {
    return {
      isOpen: false,
      subCategories: [],
      isLoading: false,
      isInitialized: false
    };
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen && !this.isInitialized) this.getSubCategories();
    },

    getSubCategories() {
      this.isLoading = true;
      getCategories({ parent: this.category.id })
        .then(data => {
          this.subCategories = data.categories;
          this.isInitialized = true;
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
