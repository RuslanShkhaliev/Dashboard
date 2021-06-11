<template>
  <div class="user-profile">
    <file-upload v-model="formData.photoURL"/>
    <v-form>
      <v-input title="Name" v-model="formData.displayName"/>
      <v-input title="Email" type="email" v-model="formData.email"/>
      <v-input title="Phone" type="tel" v-model="formData.phoneNumber"/>
    </v-form>
  </div>
</template>

<script>
  import FileUpload from "../../shared/components/FileUpload";
  export default {
    name: "VProfile",
    components: {
      FileUpload
    },
    data() {
      return {
        formData: {}
      }
    },
    created() {
      this.formData = {...this.$store.state.user}
    },
  }
</script>
