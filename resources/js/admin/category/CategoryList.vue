<template>
  <div class="card card-full">
    <h2 class="card-header">Category List</h2>

    <div class="card-body">
      <div v-if="isInitialized">
        <delete-alert
          v-if="toDeleteCategory"
          :item="`the category named '${toDeleteCategory.name}'`"
          @close="toDeleteCategory = null"
          @delete="deleteSelected"
        ></delete-alert>
        <category-filters
          :isLoading="isLoading"
          class="mb-s"
          @change="filterChanged"
          @refresh="getData"
        />
        <custom-table
          :isLoading="isLoading"
          :columns="tableHeaders"
          :contents="categories"
        >
          <template v-slot:default="slotProps">
            <tr v-for="category of slotProps.contents" v-bind:key="category.id">
              <td>{{ category.name }}</td>
              <td>{{ category.slug }}</td>
              <td>{{ category.level }}</td>
              <td>{{ category.subCategories }}</td>
              <td>{{ category.products }}</td>
              <td>{{ category.canHaveDivisions ? 'Yes' : 'No' }}</td>
              <td>
                {{
                  new Date(category.createdAt)
                    | dateFormat('DD MMM, YYYY hh:mm A')
                }}
              </td>
              <td class="flex">
                <button
                  @click="checkoutCategory(category.id)"
                  class="btn-reset mr-2"
                >
                  <i class="material-icons btn-icon">remove_red_eye</i>
                </button>
                <button
                  @click="editCategory(category.id)"
                  class="btn-reset mr-2"
                >
                  <i class="material-icons btn-icon">edit</i>
                </button>
                <button @click="showDeleteCategory(category)" class="btn-reset">
                  <i class="material-icons btn-icon">delete</i>
                </button>
              </td>
            </tr>
          </template>
        </custom-table>
        <pagination
          class="mt-s"
          :currentPage="currentPage"
          :lastPage="lastPage"
          :disabled="isLoading"
          @changed="pageChanged"
        />
      </div>

      <div class="loader loader-lg my-l" v-if="!isInitialized"></div>
    </div>
  </div>
</template>

<script>
import CustomTable from '../../components/CustomTable';
import Pagination from '../../components/Pagination';
import DeleteAlert from '../../components/DeleteAlert';
import CategoryFilters from './CategoryFilters';
import { getCategories } from '../services/category';

export default {
  data() {
    return {
      categories: [],
      isLoading: false,
      isInitialized: false,
      toDeleteCategory: null,
      query: {},
      tableHeaders: [
        {
          name: 'Name',
          isSortable: true,
          key: 'name'
        },
        {
          name: 'Slug',
          isSortable: true,
          key: 'slug'
        },
        {
          name: 'Level',
          isSortable: true,
          key: 'level'
        },
        {
          name: 'Sub categories',
          isSortable: true,
          key: 'subCategories'
        },
        {
          name: 'Products',
          isSortable: true,
          key: 'products'
        },
        {
          name: 'Can have subcategories?',
          isSortable: true,
          key: 'canHaveDivisions'
        },
        {
          name: 'Created at',
          isSortable: true,
          key: 'createdAt'
        },
        {
          name: 'Actions'
        }
      ],
      currentPage: 1,
      lastPage: 1
    };
  },
  components: { CustomTable, Pagination, CategoryFilters, DeleteAlert },

  mounted() {
    getCategories(this.query)
      .then(data => {
        this.categories = data.categories;
        this.lastPage = data.lastPage;
      })
      .catch(error => {
        this.error = 'Some error occured.';
      })
      .finally(() => {
        this.isInitialized = true;
      });
  },

  methods: {
    checkoutCategory(id) {
      this.$emit('view', id);
    },
    editCategory(id) {
      this.$emit('edit', id);
    },
    showDeleteCategory(category) {
      this.toDeleteCategory = category;
    },
    deleteSelected() {
      if (this.toDeleteCategory) {
        this.$emit('delete', this.toDeleteCategory.id);
        this.toDeleteCategory = null;
      }
    },
    pageChanged(page) {
      this.currentPage = page;
      this.isLoading = true;
      this.getData();
    },
    getData() {
      this.isLoading = true;
      getCategories({ ...this.query, page: this.currentPage })
        .then(data => {
          this.categories = data.categories;
          this.lastPage = data.lastPage;
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
    },
    filterChanged(query) {
      this.currentPage = 1;
      this.query = query;
      this.getData();
    }
  }
};
</script>
