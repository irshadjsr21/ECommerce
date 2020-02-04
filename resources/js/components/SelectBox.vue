<template>
  <div class="input-container">
    <label :for="name" class="input-label">{{ label }}</label>
    <select
      :id="name"
      class="input-box"
      :name="name"
      :value="value"
      :class="{ 'input-box-invalid': error }"
      @input="handleInput"
    >
      <option
        v-for="option of options"
        :key="option.value"
        :value="option.value"
        >{{ option.name }}</option
      >
    </select>
    <small v-if="error" class="text-danger">{{ error }}</small>
  </div>
</template>

<script>
export default {
  props: ['label', 'error', 'name', 'value', 'options'],

  data() {
    return {};
  },

  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    }
  }
};
</script>
