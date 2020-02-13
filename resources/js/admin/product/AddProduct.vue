<template>
  <div class="mb-xl">
    <h1 class="text-medium mr-l">Products</h1>
    <div class="card card-full">
      <h2 class="card-header">Add Product</h2>
      <div class="card-body">
        <form class="mb-l px-s" v-if="isInitialized">
          <input-box
            class="mx-auto mb-l"
            type="text"
            label="Name"
            name="name"
            :error="errors.name"
            v-model="values.name"
          />
          <input-box
            class="mx-auto mb-l"
            type="number"
            label="Price"
            name="price"
            :error="errors.price"
            v-model="values.price"
          />
          <input-box
            class="mx-auto mb-l"
            type="number"
            label="Discount price"
            name="discountPrice"
            :error="errors.discountPrice"
            v-model="values.discountPrice"
          />
          <select-box
            class="mx-auto mb-l"
            label="Category"
            name="categoryId"
            v-model="values.categoryId"
            :error="errors.categoryId"
            :options="categoryOptions"
          />
          <textarea-input
            class="mx-auto mb-l"
            label="Short Description"
            name="shortDescription"
            :error="errors.shortDescription"
            v-model="values.shortDescription"
          />
          <markdown-input
            class="mx-auto mb-l"
            label="Description"
            name="description"
            :error="errors.description"
            v-model="values.description"
          />
          <small class="text-danger" v-if="errors && errors.default">{{
            errors.default
          }}</small>
          <div class="flex justify-content-center mt-xl">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              @click.prevent="submit"
              :disabled="isLoading || fatalError"
            >
              Submit
            </button>
          </div>
        </form>
        <div class="loader loader-lg my-l" v-if="!isInitialized"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductCategoryOptions } from '../services/category';
import { addProduct } from '../services/product';
import InputBox from '../../components/InputBox';
import SelectBox from '../../components/SelectBox';
import TextareaInput from '../../components/TextareaInput';
import MarkdownInput from '../../components/MarkdownInput';
import schema from '../validators/product';

export default {
  components: { InputBox, SelectBox, TextareaInput, MarkdownInput },
  data() {
    return {
      isInitialized: false,
      defaultValues: {
        name: '',
        price: '',
        discountPrice: '',
        categoryId: '',
        shortDescription: ''
      },
      values: {
        name: '',
        price: '',
        discountPrice: '',
        categoryId: '',
        shortDescription: ''
      },
      errors: {},
      categoryOptions: [],
      fatalError: false,
      isLoading: false
    };
  },

  mounted() {
    getProductCategoryOptions()
      .then(categories => {
        if (categories) {
          this.categoryOptions = categories.map(category => {
            let name = category.name;
            if (category.parentCategory) {
              name += ` (${category.parentCategory.name})`;
            }

            return {
              value: category.id,
              name: name
            };
          });
        }
      })
      .catch(error => {
        this.errors.default = 'Failed to communicate with server.';
      })
      .finally(() => {
        this.isInitialized = true;
      });
  },

  methods: {
    checkForm() {
      const { errors } = schema.validate(this.values);
      this.errors = errors;
      return Object.keys(this.errors).length == 0;
    },

    submit() {
      if (this.checkForm()) {
        this.isLoading = true;
        const body = { ...this.values };
        if (!body.discountPrice) {
          delete body.discountPrice;
        }
        addProduct(body)
          .then(data => {
            this.$toasted.show(`Product created successfully.`);
            this.values = this.defaultValues;
          })
          .catch(error => {
            if (error && error.data) {
              this.errors = error.data;
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    }
  }
};
</script>
