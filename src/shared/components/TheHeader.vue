<template>
  <header class="app-header">
    <router-link :to="{name: 'dashboard'}" class="route-back" v-if="$route.meta.prevRoute">
      <v-icon src="arrow-back"/>
    </router-link>
    <div class="navigations">
      <div class="auth-controls">
        <a @click="$store.dispatch('logout')"
           class="auth-link"
           href="javascript:void(0)"
           v-if="$store.getters.isAuthenticated"
        >Log Out</a>
        <template v-else>
          <a @click="toAuth('registration')"
             class="auth-link"
             href="javascript:void(0)"
          >
            Sing Up
          </a>
          <a @click.prevent="toAuth('login')"
             class="auth-link"
             href="javascript:void(0)"
          >
            Sing In
          </a>
        </template>
      </div>
      <div class="user-profile" v-if="$store.getters.isAuthenticated">
        <router-link :style="{backgroundImage: `url('${require('@/assets/img/user-profile.jpg')}')`}"
                     :to="{name: 'profile'}"
                     class="user-profile__avatar"
        />
      </div>
    </div>
  </header>
</template>

<script>

  export default {
    name: "VHeader",
    methods: {
      toAuth(method) {
        // [method] - registration or login
        this.$openModal("Auth", {method})
      },
    }
  };
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    align-items: center;
    z-index: 10;
    padding: 10px;
    font-size: 14px;
    background-color: #262626;
    .route-back {
      padding: 6px;
      font-size: 24px;
      color: #fff;
      border-radius: 50%;
      background-color: #fff;
    }
    .navigations {
      margin-left: auto;
      display: flex;
      align-items: center;
      .auth-controls {
        padding: 0 10px;
        .auth-link {
          color: #fff;
          padding: 8px 12px;
          font-weight: 500;
          transition: .2s ease;
          &:hover {
            color: #ffc107;
          }
        }
      }
      .user-profile {
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 6px;
        overflow: hidden;
        &__avatar {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-position: center;
          background-size: cover;
        }
      }
    }
  }

</style>
