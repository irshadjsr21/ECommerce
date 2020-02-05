<template>
  <modal @close="$emit('close')">
    <template v-slot:header>
      <h3>{{ title }}</h3>
    </template>
    <template v-slot:body>
      <div class="alert-container">
        <slot></slot>
      </div>
    </template>
    <template v-slot:footer>
      <div v-if="actions" class="flex justify-content-end">
        <div
          :class="{ 'mr-l': actionTypes[actionTypes.length - 1] != actionType }"
          v-for="actionType of actionTypes"
          :key="actionType"
        >
          <button
            v-if="actions[actionType]"
            class="btn btn-lg"
            :class="actions[actionType].classes"
            @click="$emit(actionType)"
          >
            {{ actions[actionType].name }}
          </button>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from './Modal';

export default {
  props: ['title', 'actions'],
  components: { Modal },
  data() {
    return {
      actionTypes: ['negative', 'positive']
    };
  }
};
</script>

<style lang="scss" scoped>
.alert-container {
  min-width: 500px;
}

@media (max-width: 768px) {
  .alert-container {
    min-width: 70vw;
  }
}
</style>
