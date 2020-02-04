<template>
  <div class="card card-medium m-auto aminate">
    <h2 class="card-header flex justify-content-space-between">
      <span>Add Category</span>
      <button class="btn-reset" @click="emitClose">
        <i class="material-icons">close</i>
      </button>
    </h2>

    <div class="card-body">
      <form class="mb-l" v-if="isInitialized">
        <input-box
          class="mx-auto mb-l"
          type="text"
          label="Name"
          name="name"
          :error="errors.name"
          v-model="values.name"
          @input="nameChanged"
        />
        <input-box
          class="mx-auto mb-l"
          type="text"
          label="Slug"
          name="slug"
          :error="errors.slug"
          v-model="values.slug"
          hint="This will be used as the URL path for the category."
        />
        <select-box
          class="mx-auto mb-l"
          label="Parent category"
          name="parentCategoryId"
          v-model="values.parentCategoryId"
          :error="errors.parentCategoryId"
          :options="categoryOptions"
        />
        <radio-input
          class="mx-auto mb-l"
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
import { getCategoryOptions, addCategory } from '../services/category';

import InputBox from '../../components/InputBox';
import SelectBox from '../../components/SelectBox';
import RadioInput from '../../components/RadioInput';

export default {
  props: [],
  components: { InputBox, SelectBox, RadioInput },
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
      getCategoryOptions()
        .then(categories => {
          if (categories) {
            this.categoryOptions = this.categoryOptions.concat(
              categories.map(category => {
                return { value: category.id, name: category.name };
              })
            );
          }
        })
        .catch(error => {
          this.errors.default = 'Failed to communicate with server.';
        })
        .finally(() => {
          this.isInitialized = true;
        });
    },

    submit() {
      if (this.checkForm()) {
        this.isLoading = true;
        addCategory(this.values)
          .then(category => {
            if (category) {
              this.newCategory = category;
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
    },

    emitClose() {
      this.$emit('close', true);
    }
  }
};
</script>
