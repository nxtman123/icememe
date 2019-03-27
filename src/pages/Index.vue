<template>
  <q-page class="column flex-center justify-center">
    <p style="background-color: lightblue; padding: 16px;">
      Links to pages for development
      <br>
      <router-link :to="{ name: 'register' }">
        Sign Up
      </router-link> |
      <router-link :to="{ name: 'new' }">
        New Meme
      </router-link> |
      <router-link :to="{ name: 'meme', params: { memeId: 123, slug: 'my-first-meme', }}">
        Meme Page
      </router-link> |
      <router-link :to="{ name: 'user', params: { userId: 456, slug: 'john-cena' }}">
        User Profile
      </router-link> |
      <router-link :to="{ name: 'settings' }">
        Settings
      </router-link>
    </p>
    <img
      alt="Ice Doge"
      src="~assets/ice-doge.png"
      style="width:60vw;max-width:400px"
    >
    <meme-card v-bind="demoMeme" />
    <p>Send a message to the server. Choose an adjective.</p>
    <template v-if="serverMessage">
      <p
        class="text-bold"
        style="white-space: pre-line;"
      >
        {{ serverMessage }}
      </p>
      <q-btn @click="inputMessage = serverMessage = ''">
        clear
      </q-btn>
    </template>
    <form
      v-else
      @submit.prevent="onSubmit"
    >
      <q-input
        v-model="inputMessage"
        outlined
        label="adjective"
      />
    </form>
  </q-page>
</template>

<script>
import MemeCard from '../components/MemeCard';

export default {
  name: 'PageIndex',
  components: {
    'meme-card': MemeCard,
  },
  data() {
    return {
      demoMeme: {
        memeId: 0,
        userId: 1,
        username: 'icedoge',
        title: 'Sponge Bob: "I don\'t feel so good"',
        cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
        dateCreated: 1318781876,
        votesTotal: 543,
        commentCount: 17,
      },
      inputMessage: '',
      serverMessage: '',
    };
  },
  methods: {
    onSubmit() {
      this.$socket.emit('hello', this.inputMessage);
    },
  },
  sockets: {
    hello(reply) {
      this.serverMessage = reply;
    },
  },
};
</script>

<style>
</style>
