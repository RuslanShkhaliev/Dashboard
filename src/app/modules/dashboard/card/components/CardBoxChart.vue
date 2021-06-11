<template>
  <baseChart :items="items" :total="total" chart-type="box"/>
</template>

<script>
  import BaseChart from "./BaseChart";

  export default {
    name: "CardBoxChart",
    props: {
      values: {
        type: Array,
        default: () => []
      },
    },
    components: {
      BaseChart
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

<style scoped>

</style>
