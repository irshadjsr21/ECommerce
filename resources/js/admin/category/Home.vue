<template>
  <div class="mb-xl">
    <div class="flex align-items-center">
      <h1 class="text-medium mr-l">Categories</h1>
      <button
        class="btn btn-primary btn-sm flex align-items-center"
        @click="showAddForm()"
      >
        <i class="material-icons">add</i>
        <span>New</span>
      </button>
    </div>
    <add-category-form
      v-if="addForm.isActive"
      @close="addForm.isActive = false"
      @new="refreshTable"
      :isEditing="addForm.isEditing"
      :categoryId="addForm.categoryId"
    ></add-category-form>
    <category-list
      ref="categoryList"
      class="mb-l"
      @view="showViewCategory"
      @edit="showEditForm"
      @delete="deleteCategory"
    ></category-list>
    <category-view
      ref="viewComponent"
      v-if="viewCategory.length > 0"
      :id="viewCategory"
      v-model="viewCategory"
      @close="closeViewCategory"
      class="mb-l"
    ></category-view>
    <category-tree ref="categoryTree"></category-tree>
  </div>
</template>

<script>
import AddCategoryForm from './AddCategoryForm';
import CategoryList from './CategoryList';
import CategoryView from './CategoryView';
import CategoryTree from './CategoryTree';

import { deleteCategory } from '../services/category';

export default {
  components: { AddCategoryForm, CategoryList, CategoryView, CategoryTree },
  data() {
    return {
      viewCategory: [],
      addForm: {
        isActive: false,
        isEditing: false,
        categoryId: null
      }
    };
  },

  methods: {
    showViewCategory(id) {
      this.viewCategory.push(id);
    },

    closeViewCategory() {
      this.viewCategory = [];
    },

    deleteCategory(id) {
      deleteCategory(id)
        .then(data => {
          this.refreshTable();
        })
        .catch(error => {
          this.$toasted.show(error.message, {
            icon: 'error',
            className: 'toast-error'
          });
        });
    },

    refreshTable() {
      this.$refs.categoryList.getData();
      this.$refs.categoryTree.getData();
    },

    showAddForm() {
      this.addForm = {
        isActive: true,
        isEditing: false,
        categoryId: null
      };
    },

    showEditForm(id) {
      this.addForm = {
        isActive: true,
        isEditing: true,
        categoryId: id
      };
    }
  }
};
</script>
