<template>
  <button :class="['btn-close', {relative}]"
          :style="{fontSize: (10 * size) + 'px'}"
          @click="$emit('click')"
          type="button"
  >
    <v-icon :src="icon"/>
  </button>
</template>

<script>
  export default {
    name: "VClose",
    props: {
      icon: {
        default: () => "close",
      },
      relative: {
        type: Boolean,
        default: () => false
      },
      size: {
        type: Number,
        default: () => 2
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 6px;
    &.relative {
      position: relative;
    }
  }


</style>
