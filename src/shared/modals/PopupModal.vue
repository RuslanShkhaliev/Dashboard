<template>
  <div class="popup">
    <div class="popup-body">
      <v-close @click="$emit('close-popup')" class="popup-close"/>
      <transition name="fade-out">
        <v-loader v-if="loading"/>
        <slot v-else></slot>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PopupModal",
    props: {
      loading: {
        type: Boolean,
        default: () => false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .popup {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .8);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    padding: 0 10px;
    &-body {
      position: relative;
      max-width: 550px;
      min-height: 300px;
      width: 100%;
      box-shadow: 0 3px 10px -0.5px rgb(0 0 0 / 20%);
      max-height: calc(100vh - 100px);
    }
    &-close {
      position: fixed;
      top: 17px;
      right: 17px;
      padding: 10px;
      background-color: rgba(#fff, .7);
      border-radius: 50%;
      transition: background-color .2s ease;
      &:hover {
        background-color: #fff;
      }
    }
    @media (min-width: 769px) {
      &-close {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(100%, -100%)
      }
    }
  }
</style>
