<template>
  <input type="hidden" name="_csrf" :value="csrf" />
</template>

<script>
import csrfToken from '../csrfToken';
export default {
  data() {
    return {
      csrf: csrfToken()
    };
  }
};
</script>
