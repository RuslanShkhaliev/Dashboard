<template>
  <div class="v-card">
    <div :style="{backgroundImage: `url(${card.Photo})`}"
         @click.stop="showCard"
         class="v-card-preview"
    >
      <img src="http://placehold.it/280x158"
           v-if="!card.Photo"
      />
      <div class="v-card-preview__tags">
        <div :key="index"
             :style="{backgroundColor: `#${tag.Color}`}"
             v-for="(tag, index) of card.Tags"
        >
          {{tag.Name}}
        </div>
      </div>
    </div>
    <div class="v-card-inner">
      <v-close :icon="editingMode ? 'arrow-undo' : 'settings'"
               @click="toggleEditing"
               class="v-card-settings-btn"
               v-if="$store.getters.isAuthenticated"
      />

      <transition mode="out-in" name="fade-out">
        <card-settings :card="card"
                       @cancel="editingMode = false"
                       @update-card="updateCard"
                       v-if="editingMode"
        />
        <div v-else>
          <div class="v-card-header">
            <h3 class="v-card-header__name">{{card.Name}}</h3>
            <span class="v-card-header__title">{{card.Title}}</span>
          </div>
          <div class="v-card-body">
            <div class="v-card-body__row" v-if="card.Profit">
              <card-progress-bar :max-value="1000" :values="card.Profit" label="Profit" prefix="+ $"/>
            </div>
            <div class="v-card-body__row" v-if="card.Attention">
              <card-progress-bar :values="card.Attention" label="Attention" postfix="h"/>
            </div>
            <transition mode="out-in" name="show-in">
              <div class="v-card-body__row" v-if="card.Attention && isOpen">
                <card-box-chart :values="card.Attention"/>
              </div>
            </transition>
            <button :class="['v-card-body__more', {'is-open': isOpen}]" @click="isOpen = !isOpen" type="button"
                    v-if="card.Attention">
              <v-icon src="arrow-down"/>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import CardBoxChart from "./components/CardBoxChart";
  import CardProgressBar from "./components/CardProgressBar";
  import CardSettings from "./components/CardSettings";

  export default {
    name: "DashboardCard",
    components: {
      CardProgressBar,
      CardBoxChart,
      CardSettings
    },
    props: {
      card: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        editingMode: false,
        isOpen: false,
      }
    },
    methods: {
      toggleEditing() {
        this.editingMode = !this.editingMode;
      },
      showCard() {
        this.editingMode = false;
        this.$emit('click')
      },
      updateCard(card) {
        this.editingMode = false;
        this.$emit('update-card', card)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .v-card {
    position: relative;
    box-shadow: 0 0 3px rgba(0, 0, 0, .3);
    border-radius: 6px;
    overflow: hidden;
    transition: .2s ease;
    background: #fff;
    min-width: 286px;
    &:hover {
      box-shadow: 0 3px 8px 2px rgba(0, 0, 0, .15);
    }
    &-preview {
      position: relative;
      padding-top: 56.2%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      cursor: pointer;
      img {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        left: 0;
        object-fit: cover;
      }
      &__tags {
        position: absolute;
        right: 0;
        top: 12px;
        cursor: pointer;
        div {
          padding: 5px 15px 5px 10px;
          transform: translateX(30%);
          transition: transform .2s ease-in;
          border-radius: 6px 0 0 6px;
          color: #fff;
          margin-bottom: 2px;
          text-align: center;
          &:hover {
            transform: translateX(0);
          }
        }
      }
    }
    &-inner {
      position: relative;
      padding: 12px 8px 6px;
    }
    &-header {
      padding-bottom: 8px;
      border-bottom: 2px solid rgba(55, 55, 55, .16);
      margin-bottom: 20px;
      &__name,
      &__title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-word;
      }
      &__name {
        padding-right: 40px;
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: 700;
        color: #58606e;
        line-height: 24px;
        max-height: 48px;
        -webkit-line-clamp: 2;
      }
      &__title {
        color: #58606e;
        line-height: 20px;
        max-height: 57px;
        -webkit-line-clamp: 3;
      }
    }
    &-settings-btn {
      position: absolute;
      top: 12px;
      right: 8px;
      padding: 2px;
      &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: rgba(#000, .1);
        transform: scale(.5);
        opacity: 0;
        transition: .2s ease;
      }
      &:hover:after {
        transform: scale(1.4);
        opacity: 1;
      }
      .svg-icon {
        font-size: 24px;
      }
    }
    &-body {
      &__row:not(:last-child) {
        margin-bottom: 22px;
      }
      &__more {
        width: 100%;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        padding: 4px;
        border-radius: 5px;
        background-color: rgba(#989898, .1);
        transition: .2s ease;
        &.is-open {
          background-color: transparent;
          &:hover {
            background-color: rgba(#989898, .1);
          }
          .svg-icon {
            transform: rotateX(180deg)
          }
        }
      }
    }
  }
</style>
