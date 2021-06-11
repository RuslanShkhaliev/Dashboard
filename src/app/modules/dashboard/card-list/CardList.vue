<template>
  <div class="page-dashboard">
    <v-loader theme="dark" v-if="loading"/>
    <template v-else>
      <div class="dashboard-filter">
        <v-accordion :is-opened="filterIsOpen"
                     @toggle="filterIsOpen = $event"
                     absolute
                     title="Dashboard Settings"
        >
          <v-form @submit="fetchUserList">
            <div class="form-group" style="margin-bottom: 20px">
              <v-input class="form-input"
                       min="0"
                       title="Page"
                       type="number"
                       v-model="page"
              />
              <v-input class="form-input"
                       min="0"
                       title="Per page"
                       type="number"
                       v-model="pp"
              />
            </div>
            <div class="form-group">
              <v-button :loading="filterLoading"
                        title="Upload"
                        type="submit"
              />
              <v-button @click="resetFilter"
                        btn-style="danger"
                        title="Reset"
              />
              <v-button @click="filterIsOpen = false"
                        btn-style="secondary"
                        style="margin-left: auto"
                        title="Cancel"
              />
            </div>
          </v-form>
        </v-accordion>
      </div>
      <div class="grid-container" v-if="userList">
        <v-card :card="user"
                :key="user.Id"
                @click="showCard(user.Id)"
                @update-card="updateList"
                v-for="(user) in userList"
        />
      </div>
      <transition name="fade-out">
        <popup-modal :loading="!selectedCard" @close-popup="closePopup" v-if="popupIsOpen">
          <v-card :card="selectedCard" @update-card="updateList"/>
        </popup-modal>
      </transition>
    </template>
  </div>
</template>

<script>
  import VAccordion from "../../../shared/components/VAccordion";
  import {api} from "../services";

  export default {
    name: "VDashboard",
    components: {
      'v-card': () => import('../card/Card'),
      PopupModal: () => import('@/app/shared/modals/PopupModal'),
      VAccordion,
    },
    data() {
      return {
        pp: 10,
        page: 1,
        userList: [],
        popupIsOpen: false,
        selectedCard: null,
        loading: true,
        filterIsOpen: false,
        filterLoading: false,
      }
    },
    created() {
      this.paramsFromURL()
      this.fetchUserList()
    },
    watch: {
      filterOptions: "pushStateOptions"
    },
    computed: {
      filterOptions: {
        get() {
          return {
            page: this.page,
            pp: this.pp
          }
        },
        set({pp = '', page = ''}) {
          this.pp = pp;
          this.page = page;
        }
      }
    },
    methods: {
      async fetchUserList() {
        this.filterLoading = true;
        const {data} = await api.getUsers(this.filterOptions)
        this.userList = data
        this.loading = this.filterLoading = false;
      },

      async showCard(userId) {
        const {data} = await api.getUser(userId);
        this.selectedCard = data;
        this.popupIsOpen = true;
        document.body.style.overflow = 'hidden';
      },
      closePopup() {
        this.popupIsOpen = false;
        this.selectedCard = null;
        document.body.style.overflow = '';
      },
      updateList(card) {
        const cardIndex = this.userList.findIndex(el => el.Id === card.Id);
        this.$set(this.userList, cardIndex, card);
        if (this.selectedCard) {
          this.selectedCard = card;
        }
        // this.userList.splice(index, 1, card);
      },
      pushStateOptions({page, pp}) {
        let options = '';
        if (page || pp) {
          options = `?page=${page}&pp=${pp}`
        }
        history.pushState(
          null,
          document.title,
          `${this.$route.path}${options}`
        )
      },
      paramsFromURL() {
        const params = this.$route.query;
        const VALID_URL_KEYS = ['pp', 'page'];

        VALID_URL_KEYS.forEach(key => {
          if (params[key]) {
            this[key] = params[key]
          }
        })
      },
      resetFilter() {
        this.filterOptions = {}
        this.pushStateOptions(this.filterOptions)
      }
    }
  };
</script>

<style lang="scss" scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(286px, 1fr));
    gap: 20px;
    align-items: flex-start;
  }
  .dashboard-filter {
    max-width: 400px;
    margin-bottom: 25px;
    form {
      .form-group {
        display: flex;
        gap: 10px;
      }
    }
  }
</style>
