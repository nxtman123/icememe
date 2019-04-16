<template>
  <q-page class="column page-frame">
    <meme-collection />
  </q-page>
</template>

<script>
import MemeCollection from '../components/MemeCollection';

export default {
  name: 'PageIndex',
  components: {
    'meme-collection': MemeCollection,
  },
};
</script>

<style>
</style>
