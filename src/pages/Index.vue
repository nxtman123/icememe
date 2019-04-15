<template>
  <q-page class="column justify-center page-frame">
    <meme-collection
      :memes="memes"
      :disable-load="!earlierMemes"
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
      earlierMemes: true,
      doneFunc: () => null,
    };
  },
  computed: {
    earliestMeme() {
      return this.memes[this.memes.length - 1] ? this.memes[this.memes.length - 1].memeId : 0;
    },
  },
  methods: {
    loadMoreMemes(done) {
      this.doneFunc = done;
      if (this.earlierMemes) {
        this.$socket.emit('getMemes', '', this.earliestMeme);
      }
    },
  },
  sockets: {
    getMemes(memesResult) {
      if (memesResult.isSuccessful) {
        if (memesResult.value.length) {
          this.memes = this.memes.concat(memesResult.value);
        } else {
          this.earlierMemes = false;
        }
      } else {
        this.$q.notify(memesResult.value);
      }
      this.doneFunc();
    },
  },
};
</script>

<style>
</style>
