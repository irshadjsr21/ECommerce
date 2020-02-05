<template>
  <alert-box
    @close="$emit('close')"
    @negative="$emit('close')"
    @positive="$emit('delete')"
    :title="title"
    :actions="actions"
  >
    <div>Are you sure you want to delete {{ item }}?</div>
  </alert-box>
</template>

<script>
import AlertBox from './AlertBox';
export default {
  props: ['item'],
  components: { AlertBox },
  data() {
    return {
      title: 'Delete',
      actions: {
        positive: {
          name: 'Yes',
          classes: 'btn-danger'
        },
        negative: {
          name: 'No',
          classes: 'btn-default btn-simple'
        }
      }
    };
  }
};
</script>
