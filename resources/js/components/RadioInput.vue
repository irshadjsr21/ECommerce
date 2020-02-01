<template>
  <div class="input-container mb-l">
    <div class="mb-8">
      <div class="input-label">{{ label }}</div>
      <small v-if="hint" class="mt-2 text-mute">{{ hint }}</small>
    </div>
    <div class="flex">
      <div
        class="flex align-items-center mr-xl"
        v-for="option of options"
        :key="option.value"
      >
        <label :for="option.name" class="input-label">{{ option.name }}</label>
        <input
          :id="option.name"
          type="radio"
          :name="name"
          :value="option.value"
          @input="handleInput"
          :checked="option.value == value"
        />
      </div>
    </div>
    <small v-if="error" class="text-danger">{{ error }}</small>
  </div>
</template>

<script>
export default {
  props: ['label', 'error', 'name', 'value', 'options', 'hint'],

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
