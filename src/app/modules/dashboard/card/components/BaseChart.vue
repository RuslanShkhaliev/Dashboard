<template>
  <div :class="{'is-box': chartType === 'box'}" class="chart">
    <div :class="`chart-${chartType}`">
      <template v-if="items">
        <div :class="`chart-${chartType}__item`" :key="index" :style="[
                     {width: item.value},
                     {backgroundColor: item.color},
                     {zIndex: (indicators.length - index)}
                 ]"
             class="chart__item"
             v-for="(item, index) of indicators"
        ></div>
      </template>
    </div>
    <ul class="chart-items-list" v-if="chartType === 'box'">
      <li :key="index"
          :style="{backgroundColor: item.color}"
          v-for="(item, index) of indicators"
      >
        {{item.value}}
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    name: "CardBar",
    props: {
      chartType: {
        type: String,
        default: () => 'base'
      },
      items: {
        type: Array,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
    },
    computed: {
      indicators() {
        const convertToPercent = val => ((val / this.total * 100)).toFixed(2) + '%';

        return this.items.map(item => {
          return {
            value: convertToPercent(item.value),
            color: `#${item.color}`
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .chart {
    overflow: hidden;
    &.is-box {
      display: flex;
    }
    &__item {
      transition: width .4s ease-in;
    }
    &-base {
      height: 100%;
      &__item {
        height: 20px;
      }
    }
    &-bar {
      display: flex;
      height: 16px;
      padding: 2px 4px 2px 0;
      border-radius: 0 5px 5px 0;
      overflow: hidden;
      background: #fff;
      box-shadow: inset 0 2px 2px rgba(#000, .1), inset 0 -2px 2px rgba(#000, .1);
      &__item {
        height: 100%;
        border-radius: 0 5px 5px 0;
        transform: scaleX(1.04);
        box-shadow: 1px 0 2px 1px rgba(#000, .1);
      }
    }
    &-box {
      max-width: 80%;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      grid-gap: 5px;
      box-shadow: 0 0 2px rgba(#cccccc, .8);
      &__item {
        height: 50px;
        border-radius: 4px;
        &:nth-child(odd) {
          justify-self: flex-end;
        }
      }
    }
    &-items-list {
      padding: 0 5px;
      li {
        padding: 5px;
        font-size: 14px;
        font-weight: 700;
        &:not(:last-child) {
          margin-bottom: 2px;
        }
      }
    }
  }
</style>
