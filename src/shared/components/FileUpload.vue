<template>
  <div class="file-upload">
    <div>File</div>
    <input @change="handleFileUpload()" accept="image/*" hidden ref="file" type="file">
    <img :src="imagePreview" v-if="showPreview">
    <v-button @click="uploadFile" title="Upload"/>
  </div>
</template>

<script>
  // TODO реализовать загрузку изображений с предпросмотром
  export default {
    name: "FileUpload",
    data() {
      return {
        imageFile: null,
        imagePreview: null,
        showPreview: false,
      }
    },
    methods: {
      uploadFile() {

      },
      handleFileUpload() {
        this.imageFile = this.$refs.file.files[0];

        let reader = new FileReader();

        reader.addEventListener("load", () => {
          this.showPreview = true;
          this.imagePreview = reader.result;
        })

        if (this.imageFile) {
          if (/\.(jpe?g|png|gif)$/i.test(this.imageFile.name)) {
            reader.readAsDataURL(this.imageFile)
          }
        }

      }
    }
  }
</script>

<style scoped>

</style>
