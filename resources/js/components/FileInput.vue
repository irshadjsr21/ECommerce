<template>
  <div class="input-container">
    <label :for="name" class="input-label mb-4">{{ label }}</label>
    <small v-if="hint" class="mt-2 text-mute">{{ hint }}</small>

    <label :for="name" class="input-label">
      <div class="input-file-btn">
        <span v-if="value">{{ value.name }}</span>
        <span v-else>Choose a file</span>
      </div>
    </label>
    <input
      :id="name"
      class="input-file"
      type="file"
      :name="name"
      :class="{ 'input-box-invalid': error }"
      @change="handleInput"
    />
    <small v-if="error" class="text-danger mt-4">{{ error }}</small>
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
      const files = event.target.files;
      if (files && files.length > 0) {
        this.$emit('input', files[0]);
      }
    }
  }
};
</script>
