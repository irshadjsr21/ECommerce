<template>
  <modal @close="$emit('close')">
    <template v-slot:header>
      <h3 v-if="isEditing">Update Category</h3>
      <h3 v-else>Add Category</h3>
    </template>

    <template v-slot:body>
      <div class="form-container">
        <form class="mb-l px-s" v-if="isInitialized">
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
              :disabled="isLoading || fatalError"
            >
              Submit
            </button>
          </div>
        </form>
        <div class="loader loader-lg my-l" v-if="!isInitialized"></div>
      </div>
    </template>
  </modal>
</template>

<script>
import schema from '../validators/category';
import {
  getCategoryOptions,
  addCategory,
  getCategory,
  updateCategory
} from '../services/category';

import InputBox from '../../components/InputBox';
import SelectBox from '../../components/SelectBox';
import RadioInput from '../../components/RadioInput';
import Modal from '../../components/Modal';

export default {
  props: ['isEditing', 'categoryId'],
  components: { InputBox, SelectBox, RadioInput, Modal },
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
      isInitialized: false,
      fatalError: false
    };
  },

  mounted() {
    this.getOptions();
  },

  methods: {
    checkForm() {
      const { errors } = schema.validate(this.values);
      this.errors = errors;
      return Object.keys(this.errors).length == 0;
    },

    getOptions() {
      if (this.isEditing) {
        if (!this.categoryId) {
          throw new Error('Category id is required in editing mode.');
        }
        getCategory(this.categoryId)
          .then(data => {
            if (!data) throw new Error();

            this.values.name = data.name;
            this.values.slug = data.slug;
            this.values.parentCategoryId = data.parentCategoryId;
            this.values.canHaveDivisions = data.canHaveDivisions ? 'yes' : 'no';
          })
          .catch(error => {
            this.errors.default = 'Failed to communicate with server.';
            this.fatalError = true;
          })
          .finally(() => {
            this.isInitialized = true;
          });
      }

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
        if (this.isEditing) {
          updateCategory(this.categoryId, this.values)
            .then(category => {
              if (category) {
                this.newCategory = category;
                this.values = this.dafaultValues;
                this.$emit('new');
                this.$emit('close');
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
        } else {
          addCategory(this.values)
            .then(category => {
              if (category) {
                this.newCategory = category;
                this.values = this.dafaultValues;
                this.$emit('new');
                this.$emit('close');
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

<style lang="scss" scoped>
.form-container {
  min-width: 700px;
}

@media (max-width: 1024px) {
  .form-container {
    min-width: 650px;
  }
}

@media (max-width: 768px) {
  .form-container {
    min-width: 70vw;
  }
}
</style>
