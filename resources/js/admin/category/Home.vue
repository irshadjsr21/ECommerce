<template>
  <div>
    <div class="flex align-items-center">
      <h1 class="text-medium mr-l">Categories</h1>
      <button
        v-if="!showAddForm"
        class="btn btn-primary btn-sm flex align-items-center"
        @click="showAddForm = true"
      >
        <i class="material-icons">add</i>
        <span>New</span>
      </button>
    </div>
    <transition name="slideInDown">
      <add-category-form
        v-if="showAddForm"
        class="mb-xl"
        @close="showAddForm = false"
      ></add-category-form>
    </transition>
    <category-list></category-list>
  </div>
</template>

<script>
import AddCategoryForm from './AddCategoryForm';
import CategoryList from './CategoryList';

export default {
  components: { AddCategoryForm, CategoryList },
  data() {
    return {
      showAddForm: false
    };
  }
};
</script>

<style lang="scss" scoped>
.slideInDown-enter-active {
  animation: slideInDown 0.5s;
}
.slideInDown-leave-active {
  animation: slideInDown 0.5s reverse;
}
@keyframes slideInDown {
  0% {
    transform: translateY(-60%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
