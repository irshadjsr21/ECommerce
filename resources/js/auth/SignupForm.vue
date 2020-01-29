<template>
  <form ref="form" action="/signup" method="post" class="mb-l">
    <input-box
      type="text"
      label="First Name"
      name="firstName"
      :error="errors.firstName"
      v-model="values.firstName"
    />
    <input-box
      type="text"
      label="Last Name"
      name="lastName"
      :error="errors.lastName"
      v-model="values.lastName"
    />
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
    <small class="text-danger" v-if="errors && errors.default">{{ errors.default }}</small>
    <div class="flex justify-content-center mt-xl">
      <button type="submit" class="btn btn-primary btn-lg" @click.prevent="submit">Signup</button>
    </div>
  </form>
</template>

<script>
import schema from '../validators/signup';
import validate from '../validators';

export default {
  props: ['oldInputs', 'serverError'],
  data() {
    return {
      values: {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      },
      errors: {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
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
