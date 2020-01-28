<template>
  <form ref="form" action="/login" method="post" class="mb-l">
    <input-box
      type="email"
      label="Email"
      name="email"
      :error="errors.email"
      v-model="values.email"
    />
    <input-box
      type="password"
      label="Password"
      name="password"
      :error="errors.password"
      v-model="values.password"
    />
    <csrf-input />
    <div class="flex justify-content-center mt-xl">
      <button
        type="submit"
        class="btn btn-primary btn-lg"
        @click.prevent="submit"
      >
        Login
      </button>
    </div>
  </form>
</template>

<script>
import schema from '../validators/login';
import validate from '../validators';

export default {
  props: ['oldInputs', 'serverError'],
  data() {
    return {
      values: {
        email: '',
        password: ''
      },
      errors: {
        email: '',
        password: ''
      }
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
    }
  }
};
</script>
