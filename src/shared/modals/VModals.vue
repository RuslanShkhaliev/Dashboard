<template>
  <div class="modal-list">
    <component :is="require(`./${modalName}Modal`).default"
               :key="index"
               :modal-data="data"
               :style="{zIndex: 1000 + index }"
               v-for="({modalName, data}, index) of $store.getters['modal/modalList']"

    />
  </div>
</template>
<script>
  export default {
    name: "VModals",
  }
</script>
