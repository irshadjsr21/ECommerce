<template>
  <div class="input-container mb-l">
    <div v-if="label || hint" class="mb-8">
      <div class="input-label" v-if="label">{{ label }}</div>
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
          type="checkbox"
          :name="name"
          :value="option.value"
          @input="handleInput"
          :checked="value.includes(option.value)"
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
      const val = this.value || [];
      if (event.target.checked && !this.value.includes(event.target.value))
        val.push(event.target.value);
      else {
        const index = val.indexOf(event.target.value);
        if (index > -1) {
          val.splice(index, 1);
        }
      }
      this.$emit('input', val);
    }
  }
};
</script>
