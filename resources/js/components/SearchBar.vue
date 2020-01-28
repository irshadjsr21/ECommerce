<template>
  <form class="searchBar" method="get" action="/search">
    <input
      class="searchInput"
      type="text"
      name="search"
      :placeholder="placeHolder"
      @focus="focusChange(true)"
      @blur="focusChange(false)"
    />
    <button class="searchIcon" type="submit">
      <i class="material-icons">search</i>
    </button>
  </form>
</template>


<script>
export default {
  data() {
    return {
      placeHolder: 'Start searching...'
    };
  },
  methods: {
    focusChange(isFocused) {
      if (isFocused) this.placeHolder = '';
      else this.placeHolder = 'Start searching...';
    }
  }
};
</script>