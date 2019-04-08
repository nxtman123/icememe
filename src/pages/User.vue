<template>
  <q-page padding>
    <p style="padding: 15px" >Posted by: john-cena</p>
    <div class="row justify-center q-col-gutter-sm">
      <meme-card v-bind="demoMeme" />
      <meme-card v-bind="demoMeme" />
      <meme-card v-bind="demoMeme" />
      <meme-card v-bind="demoMeme" />
      <meme-card v-bind="demoMeme" />
    </div>
  </q-page>
</template>

<script>
import MemeCard from '../components/MemeCard';

export default {
  name: 'PageUser',
  components: {
    'meme-card': MemeCard,
  },
  data() {
    return {
      demoMeme: {
        memeId: 0,
        authorUsername: 'john-cena',
        title: 'Mr. Fish, I don\'t feel so good',
        cloudinaryUrl: 'https://i.kym-cdn.com/photos/images/original/001/367/501/600.jpg',
        dateCreated: 1554145159,
        voteTotal: 543,
        userVote: 'up',
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
