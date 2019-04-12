<template>
  <q-page padding>
    <h6>Upload Meme</h6>
    <form @submit.prevent.stop="onSubmit">
      <q-input
        ref="memeTitle"
        v-model="memeTitle"
        outlined
        label="Enter a title..."
        :rules="[val => !!val || 'Field is required']"
      />
      <div id="dropbox">
        <q-input
          id="new-meme-input"
          v-model="fileInput"
          outlined
          type="file"
          accept="image/*"
          clearable
          @change="fileChosen"
        />
        <q-input
          id="new-meme-facade"
          ref="fileName"
          v-model="fileName"
          outlined
          label="Choose file..."
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <q-item>
        <img id="new-meme-preview">
      </q-item>
      <q-btn
        label="Upload"
        color="primary"
        type="submit"
        class="full-width"
      />
    </form>
  </q-page>
</template>

<script>
// eslint-disable-next-line
const CLOUD_NAME = 'kingwizard'; // TODO: Channge to correct cloud
const CLOUD_PRESET = 'h4c8kn5g'; // TODO: Add upload preset to correct cloud

export default {
  name: 'PageNewMeme',
  data() {
    return {
      file: null,
      fileName: null,
      fileInput: null,
      memeTitle: null,
      accept: false,
    };
  },
  methods: {
    fileChosen(e) {
      const input = e.target;
      const output = document.getElementById('new-meme-preview');
      const reader = new FileReader();
      reader.onload = function setMemePreviewImg() {
        output.src = reader.result;
      };
      try {
        [this.file] = input.files;
        this.fileName = this.file.name;
        reader.readAsDataURL(this.file);
      } catch (error) {
        this.fileName = '';
        output.src = '';
      }
    },
    onSubmit() {
      this.$refs.memeTitle.validate();
      this.$refs.fileName.validate();

      if (this.$refs.memeTitle.hasError || this.$refs.fileName.hasError) {
        this.formHasError = true;
      } else {
        this.uploadFile();
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted',
        });
      }
    },
    uploadFile() {
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
      const xhr = new XMLHttpRequest();
      const fd = new FormData();

      xhr.open('POST', url, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      const socket = this.$socket;
      const { memeTitle } = this;

      xhr.onreadystatechange = function sendingDone() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          socket.emit('uploadMemeData', { title: memeTitle, cloudinary_url: response.secure_url });
        }
      };

      fd.append('upload_preset', CLOUD_PRESET);
      fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
      fd.append('file', this.file);
      xhr.send(fd);
    },
  },
  sockets: {
    // TODO: if needed
  },
};
</script>

<style>
</style>
