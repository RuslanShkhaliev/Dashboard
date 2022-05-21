<template>
  <modal-wrapper>
    <h2 slot="header" style="text-transform: capitalize">{{authMethod}}</h2>
    <div class="modal-auth">
      <v-form :loading="loading" @submit="formHandler" id="form-auth">
        <transition mode="out-in" name="slide-out">
          <div :key="authMethod" class="input-group">
            <v-input :autocomplete="isRegister"
                     title="Email"
                     type="email"
                     :placeholder="!isRegister && 'default: mail@mail.ru'"
                     v-model="email"
            />
            <v-input :autocomplete="isRegister"
                     title="Password"
                     type="password"
                     :placeholder="!isRegister && '123456'"
                     v-model="password"
            />
          </div>
        </transition>
      </v-form>
      <div class="form-controls">
        <v-button :loading="loading" form="form-auth" style="width: 150px" title="Send" type="submit"/>
        <p>
          go to
          <span @click="authMethod = invertedAuthMethod"
                style="text-transform: capitalize"
          >
             {{invertedAuthMethod}}
          </span>
        </p>
      </div>
    </div>
  </modal-wrapper>
</template>

<script>
  import ModalWrapper from "./ModalWrapper";

  export default {
    name: "AuthModal",
    components: {
      ModalWrapper
    },
    props: {
      modalData: {
        type: Object,
        required: false,
      },
    },
    data() {
      return {
        loading: false,
        email: "",
        password: "",
        authMethod: this.modalData.method,
      }
    },
    watch: {
      authMethod() {
        this.email = '';
        this.password = '';
      }
    },
    computed: {
      isRegister() {
        return this.authMethod === 'registration' ? 'off' : ''
      },
      invertedAuthMethod() {
        return this.authMethod === 'login' ? 'registration' : 'login';
      }
    },
    methods: {
      formHandler() {
        this.loading = true
        this.$store.dispatch('auth', [this.authMethod, this.email, this.password])
          .then(() => this.$store.dispatch('modal/closeModal'))
          .catch(() => this.loading = false)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .modal-auth {
    width: 550px;
    padding: 25px 15px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    h2 {
      margin-bottom: 20px;
    }
    .input-group {
      margin-bottom: 25px;
    }
    form {
      padding: 0 30px;
      overflow: hidden;
    }
    .form-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      p {
        font-size: 14px;
        color: #6e6e6e;
      }
      span {
        margin-left: 15px;
        cursor: pointer;
        font-weight: 700;
        font-size: 18px;
        color: rgba(10, 14, 95, 0.55);
        transition: .2s ease;
        &:hover {
          color: rgb(10, 14, 95,);
        }
      }
    }
  }
</style>
