<template>
  <div class="table-container">
    <table class="table table-striped" :class="{ 'table-loading': isLoading }">
      <thead>
        <th v-for="column of columns" :key="column.name">
          <button
            @click="sort(column)"
            class="btn-reset p-0"
            v-if="column.isSortable"
          >
            <span
              v-if="!sortData.column || sortData.column.name != column.name"
            >
              {{ column.name }}
            </span>

            <div
              v-if="sortData.column && sortData.column.name == column.name"
              class="flex align-items-center"
            >
              <span class="mr-8">
                {{ column.name }}
              </span>
              <span>
                <i class="material-icons" v-if="sortData.asc">
                  keyboard_arrow_down
                </i>
                <i class="material-icons" v-if="!sortData.asc">
                  keyboard_arrow_up
                </i>
              </span>
            </div>
          </button>
          <span v-if="!column.isSortable">{{ column.name }}</span>
        </th>
      </thead>

      <slot v-bind:contents="localContent"></slot>
    </table>
  </div>
</template>

<script>
export default {
  props: ['columns', 'contents', 'isLoading'],
  data() {
    return {
      localContent: this.contents ? [...this.contents] : [],
      sortData: {
        column: null,
        asc: null
      }
    };
  },

  watch: {
    contents: function(newVal) {
      this.localContent = [...newVal];
    }
  },

  methods: {
    sort(column) {
      if (this.sortData.column && this.sortData.column.name == column.name) {
        if (this.sortData.asc) {
          this.sortData.asc = false;
        } else {
          this.sortData = {
            asc: null,
            column: null
          };
          this.localContent = this.contents ? [...this.contents] : [];
        }
      } else {
        this.sortData.column = column;
        this.sortData.asc = true;
      }

      this.sortContents();
    },

    sortContents() {
      if (this.localContent.length <= 0) return;
      if (!this.sortData.column) return;
      const key = this.sortData.column.key;
      const compareFunc = this.defaultCompare(key);
      this.localContent = this.localContent.sort(compareFunc);
      if (!this.sortData.asc) {
        this.localContent = this.localContent.reverse();
      }
    },

    defaultCompare(key) {
      return (a, b) => {
        return a[key] == b[key] ? 0 : a[key] < b[key] ? -1 : 1;
      };
    }
  }
};
</script>
