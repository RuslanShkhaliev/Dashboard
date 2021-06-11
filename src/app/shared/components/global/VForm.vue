<!--
This is a stupid component,
but maybe it will be extended,
for example, for validation
-->
<template>
  <form :class="{'form-freeze': loading}" @submit.prevent="formSubmit">
    <slot></slot>
  </form>

</template>

<script>
  export default {
    name: "VForm",
    props: {
      loading: {
        type: Boolean,
        default: () => false
      }
    },
    methods: {
      formSubmit(event) {
        if (!this.loading) {
          this.$emit('submit', event)
        }
      }
    }
  }
</script>
<style lang="scss">
  form {
    position: relative;
    &.form-freeze {
      pointer-events: none;
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fefefe;
        animation: animation-blink 3s linear infinite;
      }
    }
  }

</style>
