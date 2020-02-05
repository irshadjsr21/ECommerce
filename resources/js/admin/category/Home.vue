<template>
  <div>
    <div class="flex align-items-center">
      <h1 class="text-medium mr-l">Categories</h1>
      <button
        class="btn btn-primary btn-sm flex align-items-center"
        @click="showAddForm = true"
      >
        <i class="material-icons">add</i>
        <span>New</span>
      </button>
    </div>
    <add-category-form
      v-if="showAddForm"
      class="mb-xl"
      @close="showAddForm = false"
      @new="newCategoryAdded"
    ></add-category-form>
    <category-list
      ref="categoryList"
      class="mb-l"
      @view="showViewCategory"
    ></category-list>
    <category-view
      ref="viewComponent"
      v-if="viewCategory.length > 0"
      :id="viewCategory"
      v-model="viewCategory"
      @close="closeViewCategory"
    ></category-view>
  </div>
</template>

<script>
import AddCategoryForm from './AddCategoryForm';
import CategoryList from './CategoryList';
import CategoryView from './CategoryView';

export default {
  components: { AddCategoryForm, CategoryList, CategoryView },
  data() {
    return {
      showAddForm: false,
      viewCategory: []
    };
  },

  methods: {
    showViewCategory(id) {
      this.viewCategory.push(id);
    },

    closeViewCategory() {
      this.viewCategory = [];
    },

    newCategoryAdded() {
      this.$refs.categoryList.getData();
    }
  }
};
</script>
