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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    animation-delay: 1s;
    &--default {
      background-color: transparent;
    }
    &--dark {
      background-color: #262626;
    }
    &--white {
      background-color: #fff;
    }
    #circle4 {
      display: block;
      max-height: 60px;
      max-width: 60px;
      width: 5vw;
      height: 5vw;
      min-height: 50px;
      min-width: 50px;
      border: 3px #ffc107 solid;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin4 1s infinite linear;
    }
  }
  @keyframes spin4 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>
