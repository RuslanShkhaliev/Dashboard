<template>
  <div class="progress-bar">
    <div class="progress-bar__header">
      <span>{{label}}</span>
      <span class="">{{prefix}}{{total}}{{postfix}}</span>
    </div>
    <baseChart :items="items" :total="maxValue || total" chart-type="bar"/>
  </div>
</template>

<script>
  import BaseChart from "./BaseChart";

  export default {
    name: "ProgressBar",
    components: {
      BaseChart,
    },
    props: {
      label: {
        type: String,
        default: () => "Label"
      },
      values: {
        type: Array,
        default: () => []
      },
      maxValue: {
        type: Number,
        default: () => null
      },
      postfix: {
        type: String,
        default: () => ''
      },
      prefix: {
        type: String,
        default: () => ''
      }
    },
    computed: {
      items() {
        return this.values.map(item => {
          return {
            value: item.Amount,
            color: item.Color
          }
        })
      },

      total() {
        return this.values.map(item => item.Amount).reduce((a, x) => a + x, 0)
      }
    }
  }
</script>

<style lang="scss">
  .progress-bar {
    &__header {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      span {
        color: #58606e;
      }
    }
  }

</style>
