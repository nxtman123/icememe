<template>
  <q-page class="column justify-center page-frame">
    <meme-collection
      :memes="memes"
      @load="loadMoreMemes"
    />
  </q-page>
</template>

<script>
import MemeCollection from '../components/MemeCollection';

export default {
  name: 'PageIndex',
  components: {
    'meme-collection': MemeCollection,
  },
  data() {
    return {
      memes: [],
      earliestMeme: 0,
    };
  },
  methods: {
    loadMoreMemes(done) {
      setTimeout(() => {
        if (this.memes) {
          this.$socket.emit('getMemes', '', this.earliestMeme);
        }
        done();
      }, 1500);
    },
  },
  sockets: {
    getMemes(reply) {
      if (reply.value.length > 0) {
        reply.value.forEach((item) => { this.memes.push(item); });
        this.earliestMeme = reply.value[reply.value.length - 1].meme_id;
      }
    },
  },
};
</script>

<style>
</style>
