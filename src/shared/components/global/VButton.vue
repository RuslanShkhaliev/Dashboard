<template>
  <button :class="[
                'v-button',
                `v-button--${btnStyle}`,
                size,
                {full},
                {'v-button--loading': loading}
            ]"
          :type="type"
          v-bind="$attrs"
          v-on="$listeners"
  >
    <span class="loading-text" v-if="loading">Loading</span>
    <template v-else>
      <template v-if="title">{{title}}</template>
      <slot v-else></slot>
    </template>
  </button>
</template>

<script>
  export default {
    name: "VButton",
    props: {
      title: {
        type: String,
        default: () => ''
      },
      type: {
        type: String,
        default: () => "button"
      },
      btnStyle: {
        type: String,
        default: () => "primary"
      },
      size: {
        type: String,
        default: () => "md"
      },
      full: {
        type: Boolean,
        default: () => false
      },
      loading: {
        type: Boolean,
        default: () => false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .v-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5em .8em;
    color: #222;
    border-radius: 4px;
    border: 1px solid transparent;
    white-space: nowrap;
    transition: 0.3s ease;
    &.xs {
      font-size: 12px;
    }
    &.sm {
      font-size: 14px;
    }
    &.md {
      font-size: 16px;
    }
    &.lg {
      font-size: 20px;
    }
    &.full {
      width: 100%;
    }
    &--primary {
      background-color: #00bfff;
      color: #fff;
    }
    &--secondary {
      color: #989898;
      border-color: #989898;
    }
    &--danger {
      color: #ff000c;
      border-color: #ff000c;
    }
    &:disabled {
      pointer-events: none;
      background-color: #ccc;
    }
    &--loading {
      pointer-events: none;
      .loading-text {
        animation: animation-blink 3s linear infinite;
      }
    }
  }
</style>
