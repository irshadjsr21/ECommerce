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
        <csrf-input />
        <small class="text-danger" v-if="errors && errors.default">{{
          errors.default
        }}</small>
        <div class="flex justify-content-center mt-xl">
          <button
            type="submit"
            class="btn btn-primary btn-lg"
            @click.prevent="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import schema from '../validators/category';
import validate from '../../validators';

export default {
  props: ['oldInputs', 'serverError', 'categories'],
  data() {
    return {
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
      ]
    };
  },

  mounted() {
    try {
      if (this.oldInputs) {
        const oldInputs = JSON.parse(this.oldInputs);
        for (const key in oldInputs) {
          this.values[key] = oldInputs[key];
        }
      }

      if (this.serverError) {
        const serverError = JSON.parse(this.serverError);
        for (const key in serverError) {
          this.errors[key] = serverError[key];
        }
      }

      if (this.categories) {
        const categories = JSON.parse(this.categories);
        this.categoryOptions = this.categoryOptions.concat(
          categories.map(category => {
            return { value: category.id, name: category.name };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    checkForm() {
      this.errors = validate(schema, this.values) || {};
      return Object.keys(this.errors).length == 0;
    },

    submit() {
      if (this.checkForm()) this.$refs.form.submit();
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
