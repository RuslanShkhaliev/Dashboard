<template>
  <div class="_modal">
    <div @click="close" class="_modal-bg"></div>
    <div class="_modal-inner">
      <div class="_modal-header">
        <h2 v-if="title">{{title}}</h2>
        <v-close :size="2.5" @click="close"/>
        <slot name="header"/>
      </div>
      <div class="_modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ModalWrapper",
    inheritAttrs: false,
    props: {
      title: String,
    },
    methods: {
      close() {
        this.$store.dispatch('modal/closeModal')
      }
    }
  }
</script>

<style lang="scss" scoped>
  ._modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    padding-right: 16px;
    &-bg {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(10, 10, 10, .9);
    }
    &-header {
      padding: 20px;
    }
    &-inner {
      position: relative;
      max-width: 800px;
      background: #fff;
      border-radius: 6px;
      overflow: hidden;
    }
  }
</style>
