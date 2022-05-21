<template functional>
  <div :class="['pre-loader',`pre-loader--${props.theme}`]" :style="{opacity: props.opacity}">
    <div id="circle4"></div>
  </div>
</template>

<script>
  export default {
    name: "VLoader",
    props: {
      theme: {
        type: String,
        default: () => 'default'
      },
      opacity: {
        type: Number,
        default: () => 1
      }
    }
  }
</script>
<style lang="scss">
  .pre-loader {
    &--default {
      background-color: transparent;
    }
    &--dark {
      background-color: #262626;
    }
    &--white {
      background-color: #fff;
    }
  }
</style>
