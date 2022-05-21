<template>
  <div class="input-wrapper">
    <label @click="focusField" v-if="title">{{title}}</label>
    <div class="input-field">
      <input :readonly="readonly"
             :value="value"
             ref="input"
             v-bind="$attrs"
             v-on="inputHandlers"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: "VInput",
    inheritAttrs: false,
    props: {
      value: {},
      title: {
        type: String,
        default: () => null
      },
      autocomplete: String,
      readonly: {
        type: Boolean,
        default: () => false
      },
    },
    mounted() {
      this.disableAutocomplete();
    },
    computed: {
      inputHandlers() {
        return {
          ...this.$listeners,
          input: this.inputHandler
        }
      }
    },
    methods: {
      disableAutocomplete() {
        const input = this.$refs.input;
        if (input && this.autocomplete === "off") {
          input.setAttribute("readonly", "readonly");
          input.onfocus = () => {
            if (!this.readonly) {
              input.removeAttribute("readonly");
            }
          };
        }
      },
      focusField() {
        this.$refs.input.focus();
      },
      inputHandler(event) {
        const value = event.target.value;
        this.$emit("change", value);
        this.$emit("input", value);
      }
    }


  }
</script>

<style lang="scss" scoped>
  .input-wrapper {
    label {
      display: inline-flex;
      padding: 4px 0;
      font-weight: 500;
      font-size: 14px;
      color: #58606e;
      cursor: pointer;
    }
    .input-field {
      input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        color: #58606e;
        transition: .2s ease-in;
        &:focus {
          border-color: #ffc107;
          outline: none;
        }
      }
    }
  }
</style>
