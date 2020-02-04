<template>
  <div class="input-container">
    <div v-if="label || hint" class="mb-8">
      <div class="input-label" v-if="label">{{ label }}</div>
      <small v-if="hint" class="mt-2 text-mute">{{ hint }}</small>
    </div>
    <div v-if="!optionsCol" class="flex">
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
    <div v-if="optionsCol" class="flex flex-column">
      <div
        class="flex align-items-center mb-8"
        v-for="option of options"
        :key="option.value"
      >
        <input
          :id="option.name"
          type="radio"
          :name="name"
          :value="option.value"
          @input="handleInput"
          :checked="option.value == value"
          class="my-0 mr-6"
        />
        <label :for="option.name" class="input-label">{{ option.name }}</label>
      </div>
    </div>
    <small v-if="error" class="text-danger">{{ error }}</small>
  </div>
</template>

<script>
export default {
  props: ['label', 'error', 'name', 'value', 'options', 'hint', 'optionsCol'],

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
