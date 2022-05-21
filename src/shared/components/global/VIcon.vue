<template functional>
  <svg :class="`svg-icon icon-${props.src}`">
    <use v-bind="{ 'xlink:href': `${require('@/assets/icons/icons-sprite.svg')}#icon-${props.src}`}"></use>
  </svg>
</template>
<script>
  export default {
    name: "VIcon",
    props: {
      src: {
        type: String,
        required: true
      }
    },
  };
</script>
<style lang="scss">
  .svg-icon {
    width: 1em;
    height: 1em;
    display: inline-block;
    vertical-align: top
  }
</style>
