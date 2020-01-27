<template>
  <div class="input-container mb-l">
    <label :for="name" class="input-label">{{ label }}</label>
    <input
      :id="name"
      class="input-box"
      :type="type"
      :name="name"
      :value="value"
      :class="{ 'input-box-invalid': error }"
      @input="handleInput"
    />
    <small v-if="error" class="text-danger">{{ error }}</small>
  </div>
</template>

<script>
export default {
  props: ['type', 'label', 'error', 'name', 'value'],

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
