<template>
  <div>
    <h1>Login Form</h1>
    <form ref="form" action="/login" method="post">
      <input type="email" name="email" placeholder="Email" />
      <br />
      <br />
      <input type="password" name="password" placeholder="Password" />
      <br />
      <br />
      <button type="submit" @click.prevent="submit">Login</button>
    </form>
  </div>
</template>
 

<script>
export default {
  props: ['oldInputs', 'errors'],
  data() {
    return {};
  },

  mounted() {
    console.log(this.oldInputs);
    console.log(this.errors);
  },

  methods: {
    submit() {
      console.log('Via JS');
      this.$refs.form.submit();
    }
  }
};
</script>