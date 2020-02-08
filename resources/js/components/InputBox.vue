<template>
  <div class="input-container">
    <label :for="name" class="input-label">{{ label }}</label>
    <small v-if="hint" class="mt-2 text-mute">{{ hint }}</small>
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
  props: ['type', 'label', 'error', 'name', 'value', 'hint'],

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
