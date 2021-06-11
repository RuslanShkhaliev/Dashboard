<template>
  <notifications group="app">
    <template slot="body" slot-scope="{ item, close }">
      <div :class="item.type" class="notify-app">
        <div class="left">
          <v-icon :src="item.type"/>
        </div>
        <div class="right">
          <p class="title">
            {{ item.title }}
          </p>
          <v-close @click="close"/>
          <div class="content" v-html="item.text" v-if="item.text"/>
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
  export default {
    name: "VNotifications"
  }
</script>

<style lang="scss">
  .vue-notification-group {
    min-width: 100%;
    padding: 10px;
    span {
      display: block;
    }
    @media (min-width: 769px) {
      min-width: 360px;
    }
  }
  .notify-app {
    display: flex;
    min-height: 70px;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
    margin-bottom: 10px;
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 6rem;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      .svg-icon {
        font-size: 20px;
      }
    }
    .right {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      padding: .8rem 1.5rem 1rem;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      background-color: #fff;
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .content {
        margin-top: 8px;
        color: #58606e;
      }
    }
    // style for content
    &.success {
      .left {
        background-color: #48bb78;
      }
      .title {
        color: #48bb78;
      }
    }
    &.error {
      .left {
        background-color: red;
      }
    }
    &.info {
      .left {
        background-color: #2196f3;
      }
    }
  }
</style>
