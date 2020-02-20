<template>
  <div class="card card-full">
    <h2 class="card-header">Product List</h2>

    <div class="card-body">
      <div v-if="isInitialized">
        <!-- <delete-alert
          v-if="toDeleteProduct"
          :item="`the product named '${toDeleteProduct.name}'`"
          @close="toDeleteProduct = null"
          @delete="deleteSelected"
        ></delete-alert> -->
        <product-filters
          :isLoading="isLoading"
          class="mb-s"
          @change="filterChanged"
          @refresh="getData"
        />
        <custom-table
          :isLoading="isLoading"
          :columns="tableHeaders"
          :contents="products"
        >
          <template v-slot:default="slotProps">
            <tr v-for="product of slotProps.contents" v-bind:key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.discountPrice }}</td>
              <td>
                {{
                  new Date(product.createdAt)
                    | dateFormat('DD MMM, YYYY hh:mm A')
                }}
              </td>
              <td class="flex">
                <button
                  @click="checkoutProduct(product.id)"
                  class="btn-reset mr-2"
                >
                  <i class="material-icons btn-icon">remove_red_eye</i>
                </button>
                <button @click="editProduct(product.id)" class="btn-reset mr-2">
                  <i class="material-icons btn-icon">edit</i>
                </button>
                <button @click="showDeleteProduct(product)" class="btn-reset">
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
import ProductFilters from './ProductFilters';
import { getProducts } from '../services/product';

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      isInitialized: false,
      toDeleteProduct: null,
      query: {},
      tableHeaders: [
        {
          name: 'Name',
          isSortable: true,
          key: 'name'
        },
        {
          name: 'Category',
          isSortable: true,
          key: 'category'
        },
        {
          name: 'Price',
          isSortable: true,
          key: 'price'
        },
        {
          name: 'Discount price',
          isSortable: true,
          key: 'discountPrice'
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
  components: { CustomTable, Pagination, DeleteAlert, ProductFilters },

  mounted() {
    getProducts(this.query)
      .then(data => {
        this.setProducts(data.products);
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
    setProducts(products) {
      this.products = products.map(elem => {
        return {
          ...elem,
          discountPrice: elem.discountPrice ? elem.discountPrice : 'NONE',
          category: elem.category ? elem.category.name : ''
        };
      });
    },

    checkoutProduct(id) {
      this.$emit('view', id);
    },
    editProduct(id) {
      this.$emit('edit', id);
    },
    showDeleteProduct(product) {
      this.toDeleteProduct = product;
    },
    deleteSelected() {
      if (this.toDeleteProduct) {
        this.$emit('delete', this.toDeleteProduct.id);
        this.toDeleteProduct = null;
      }
    },
    pageChanged(page) {
      this.currentPage = page;
      this.isLoading = true;
      this.getData();
    },
    getData() {
      this.isLoading = true;
      getProducts({ ...this.query, page: this.currentPage })
        .then(data => {
          this.setProducts(data.products);
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
