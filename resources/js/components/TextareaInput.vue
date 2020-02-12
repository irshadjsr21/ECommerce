<template>
  <div class="input-container">
    <label :for="name" class="input-label">{{ label }}</label>
    <small v-if="hint" class="mt-2 text-mute">{{ hint }}</small>
    <textarea
      :id="name"
      class="input-box"
      :name="name"
      rows="4"
      :value="value"
      :class="{ 'input-box-invalid': error }"
      @input="handleInput"
    ></textarea>
    <small v-if="error" class="text-danger">{{ error }}</small>
  </div>
</template>

<script>
export default {
  props: ['label', 'error', 'name', 'value', 'hint'],

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
