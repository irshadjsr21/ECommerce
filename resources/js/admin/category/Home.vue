<template>
  <div>
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
      class="mb-xl"
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
    ></category-view>
  </div>
</template>

<script>
import AddCategoryForm from './AddCategoryForm';
import CategoryList from './CategoryList';
import CategoryView from './CategoryView';

import { deleteCategory } from '../services/category';

export default {
  components: { AddCategoryForm, CategoryList, CategoryView },
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
          console.log(error);
        });
    },

    refreshTable() {
      this.$refs.categoryList.getData();
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
