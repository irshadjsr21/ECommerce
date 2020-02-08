<template>
  <div class="pagination" v-if="currentPage && lastPage">
    <button
      class="pagination-btn"
      :disabled="disabled || currentPage == 1"
      @click="pageChange(1)"
    >
      <i class="material-icons">
        keyboard_arrow_left
      </i>
    </button>
    <button
      class="pagination-btn"
      v-for="page of pages"
      :key="page"
      @click="pageChange(page)"
      :class="{ 'pagination-btn-active': page == currentPage }"
      :disabled="disabled"
    >
      {{ page }}
    </button>
    <button
      class="pagination-btn"
      @click="pageChange(lastPage)"
      :disabled="disabled || currentPage == lastPage"
    >
      <i class="material-icons">
        keyboard_arrow_right
      </i>
    </button>
  </div>
</template>

<script>
export default {
  props: ['currentPage', 'lastPage', 'disabled'],
  data() {
    return {
      pageIndex: [-2, -1, 0, +1, +2],
      pages: []
    };
  },

  watch: {
    currentPage: function(newVal) {
      this.computePages();
    },
    lastPage: function(newVal) {
      this.computePages();
    }
  },

  mounted() {
    this.computePages();
  },

  methods: {
    checkBoundry(page) {
      return page > 0 && page <= this.lastPage;
    },

    pageChange(page) {
      this.$emit('changed', page);
    },

    computePages() {
      if (this.currentPage && this.lastPage) {
        const pages = [];
        for (const page of this.pageIndex) {
          if (this.checkBoundry(this.currentPage + page))
            pages.push(this.currentPage + page);
        }

        this.pages = pages;
      } else this.pages = [];
    }
  }
};
</script>
