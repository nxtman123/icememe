<template>
  <q-infinite-scroll
    :offset="250"
    :disable="!moreToGo"
    @load="loadMoreMemes"
  >
    <masonry
      class="q-pt-md"
      :gutter="16"
      :cols="{default: 3, 1024: 2, 600: 1}"
    >
      <meme-card
        v-for="meme in sortedMemes"
        :key="meme.id"
        class="q-pb-md"
        v-bind="meme"
      />
    </masonry>

    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner
          color="primary"
          size="40px"
        />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script>
import MemeCard from '../components/MemeCard';

export default {
  name: 'MemeCollection',
  components: {
    'meme-card': MemeCard,
  },
  props: {
    username: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      memes: [],
      moreToGo: true,
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
    loadMoreMemes(_, done) {
      this.$socket.emit('getMemes', this.username, this.earliestMeme, (memesResult) => {
        if (memesResult.isSuccessful) {
          if (memesResult.value.length) {
            this.memes = this.memes.concat(memesResult.value);
          } else {
            this.moreToGo = false;
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
