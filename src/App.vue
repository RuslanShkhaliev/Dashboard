<template>
  <div class="app-wrap">
    <router-view v-if="$route.meta.full"/>
    <template v-else>
      <TheHeader/>
      <main>
        <transition :name="$route.meta.transition" mode="out-in">
          <keep-alive :max="3">
            <router-view/>
          </keep-alive>
        </transition>
      </main>
    </template>
    <VNotifications/>
    <VModals v-if="$store.getters['modal/modalIsOpen']"/>
  </div>
</template>
<script>
  import TheHeader from "./shared/components/TheHeader";
  import VNotifications from "./shared/components/VNotifications";
  export default {
    name: "App",
    components: {
      TheHeader,
      VNotifications,
      VModals: () => import("./shared/modals/VModals")
    },
  }
</script>
<style>

</style>
