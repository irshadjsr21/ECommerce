<template>
  <div class="card card-full">
    <h2 class="card-header">Category List</h2>

    <div class="card-body">
      <custom-table
        v-if="isInitialized"
        :columns="tableHeaders"
        :contents="categories"
      >
        <template v-slot:default="slotProps">
          <tr v-for="category of slotProps.contents" v-bind:key="category.id">
            <td>{{ category.name }}</td>
            <td>{{ category.slug }}</td>
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
              <button @click="editCategory(category.id)" class="btn-reset mr-2">
                <i class="material-icons btn-icon">edit</i>
              </button>
              <button @click="deleteCategory(category.id)" class="btn-reset">
                <i class="material-icons btn-icon">delete</i>
              </button>
            </td>
          </tr>
        </template>
      </custom-table>

      <div class="loader loader-lg my-l" v-if="!isInitialized"></div>
    </div>
  </div>
</template>

<script>
import CustomTable from '../../components/CustomTable';
import { getCategory } from '../services/category';

export default {
  data() {
    return {
      categories: [],
      error: null,
      isLoading: false,
      isInitialized: false,
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
      ]
    };
  },
  components: { CustomTable },
  mounted() {
    getCategory()
      .then(data => {
        this.categories = data.categories;
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
      console.log('Checkout ' + id);
    },
    editCategory(id) {
      console.log('Checkout ' + id);
    },
    deleteCategory(id) {
      console.log('Checkout ' + id);
    }
  }
};
</script>
