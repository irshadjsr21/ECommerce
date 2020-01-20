<template>
  <div>
    <h1>Signup Form</h1>
    <form ref="form" action="/signup" method="post">
      <input type="text" name="firstName" placeholder="First Name" />
      <br />
      <br />
      <input type="text" name="lastName" placeholder="Last Name" />
      <br />
      <br />
      <input type="email" name="email" placeholder="Email" />
      <br />
      <br />
      <input type="password" name="password" placeholder="Password" />
      <br />
      <br />
      <button type="submit" @click.prevent="submit">Signup</button>
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