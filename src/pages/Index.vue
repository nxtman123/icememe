<template>
  <q-page class="column justify-center page-frame">
    <meme-collection
      :memes="sortedMemes"
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
    };
  },
  computed: {
    sortedMemes() {
      return this.memes.slice().sort((a, b) => (a.memeId < b.memeId));
    },
    earliestMeme() {
      return this.memes.length
        ? this.memes.reduce((eId, m) => Math.min(eId, m.memeId), Infinity)
        : 0;
    },
  },
  methods: {
    loadMoreMemes(done) {
      this.$socket.emit('getMemes', '', this.earliestMeme, (memesResult) => {
        if (memesResult.isSuccessful) {
          if (memesResult.value.length) {
            this.memes = this.memes.concat(memesResult.value);
          } else {
            this.earlierMemes = false;
          }
        } else {
          this.$q.notify(memesResult.value);
        }
        done();
      });
    },
  },
};
</script>

<style>
</style>
