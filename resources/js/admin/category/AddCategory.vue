<template>
  <div class="card card-medium m-auto">
    <div class="card-header">
      Add Category
    </div>

    <div class="card-body">
      <form
        ref="form"
        :action="adminPath + '/categories/new'"
        method="post"
        class="mb-l"
        v-if="isInitialized"
      >
        <input-box
          class="mx-auto"
          type="text"
          label="Name"
          name="name"
          :error="errors.name"
          v-model="values.name"
          @input="nameChanged"
        />
        <input-box
          class="mx-auto"
          type="text"
          label="Slug"
          name="slug"
          :error="errors.slug"
          v-model="values.slug"
          hint="This will be used as the URL path for the category."
        />
        <select-box
          class="mx-auto"
          label="Parent category"
          name="parentCategoryId"
          v-model="values.parentCategoryId"
          :error="errors.parentCategoryId"
          :options="categoryOptions"
        />
        <radio-input
          class="mx-auto"
          label="Can it have sub categories?"
          name="canHaveDivisions"
          v-model="values.canHaveDivisions"
          :error="errors.canHaveDivisions"
          :options="divisionOptions"
          hint="If yes then it cannot have products directly under it."
        />
        <small class="text-danger" v-if="errors && errors.default">{{
          errors.default
        }}</small>
        <div class="flex justify-content-center mt-xl">
          <button
            type="submit"
            class="btn btn-primary btn-lg"
            @click.prevent="submit"
            :disabled="isLoading"
          >
            Submit
          </button>
        </div>
      </form>
      <div class="loader loader-lg my-l" v-if="!isInitialized"></div>
    </div>
  </div>
</template>

<script>
import schema from '../validators/category';
import validate from '../../validators';
import http from '../../http';

export default {
  props: [],
  data() {
    return {
      dafaultValues: {
        name: '',
        slug: '',
        parentCategoryId: null,
        canHaveDivisions: 'yes'
      },
      values: {
        name: '',
        slug: '',
        parentCategoryId: null,
        canHaveDivisions: 'yes'
      },
      errors: {
        name: '',
        slug: '',
        parentCategoryId: '',
        canHaveDivisions: ''
      },
      adminPath: window.adminPath,
      categoryOptions: [
        {
          name: 'None',
          value: null
        }
      ],
      divisionOptions: [
        {
          name: 'Yes',
          value: 'yes'
        },
        {
          name: 'No',
          value: 'no'
        }
      ],
      newCategory: null,
      isLoading: false,
      isInitialized: false
    };
  },

  mounted() {
    this.getOptions();
  },

  methods: {
    checkForm() {
      this.errors = validate(schema, this.values) || {};
      return Object.keys(this.errors).length == 0;
    },

    getOptions() {
      http
        .get('/admin/category/parent-options')
        .then(res => {
          if (res && res.data) {
            const categories = res.data.categories;
            if (categories) {
              this.categoryOptions = this.categoryOptions.concat(
                categories.map(category => {
                  return { value: category.id, name: category.name };
                })
              );
            }
          } else {
            throw new Error('No data');
          }
        })
        .catch(error => {
          this.errors.default = 'Failed to communicate with server.';
          console.log(error);
        })
        .finally(() => {
          this.isInitialized = true;
        });
    },

    submit() {
      if (this.checkForm()) {
        console.log('Loading');
        this.isLoading = true;
        http
          .post('/admin/category', {
            ...this.values
          })
          .then(res => {
            if (res && res.data && res.data.category) {
              this.newCategory = res.data.category;
              this.values = this.dafaultValues;
            }
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
    },

    nameChanged() {
      this.values.slug = this.values.name
        .toLowerCase()
        .split(' ')
        .join('-');
    }
  }
};
</script>
