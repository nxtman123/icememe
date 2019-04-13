<template>
  <q-infinite-scroll
    :offset="250"
    @load="(_, done) => $emit('load', done)"
  >
    <masonry
      class="q-pt-md"
      :gutter="16"
      :cols="{default: 3, 1024: 2, 600: 1}"
    >
      <meme-card
        v-for="meme in memes"
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
    memes: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>
