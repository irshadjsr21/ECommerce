<template>
  <form
    ref="form"
    :action="forAdmin ? adminPath + '/login' : '/login'"
    method="post"
    class="mb-l"
  >
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
    <input-box
      type="password"
      label="Secret"
      name="secret"
      :error="errors.secret"
      v-model="values.secret"
      v-if="forAdmin"
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
        Login
      </button>
    </div>
  </form>
</template>

<script>
import loginSchema from '../validators/login';
import adminLoginSchema from '../validators/adminLogin';
import validate from '../validators';

import InputBox from '../components/InputBox';
import CsrfInput from '../components/CsrfInput';

export default {
  props: ['oldInputs', 'serverError', 'forAdmin', 'adminPath'],
  components: { InputBox, CsrfInput },
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

      if (this.forAdmin) {
        this.values.secret = '';
        this.errors.secret = '';
      }
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    getSchema() {
      if (this.forAdmin) return adminLoginSchema;
      return loginSchema;
    },

    checkForm() {
      this.errors = validate(this.getSchema(), this.values) || {};
      return Object.keys(this.errors).length == 0;
    },

    submit() {
      if (this.checkForm()) this.$refs.form.submit();
    }
  }
};
</script>
