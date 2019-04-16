<template>
  <q-page class="column page-frame">
    <div class="text-h6 q-py-md">
      {{ username }}
    </div>
    <meme-collection :username="username" />
  </q-page>
</template>

<script>
import MemeCollection from '../components/MemeCollection';

export default {
  name: 'PageUser',
  components: {
    'meme-collection': MemeCollection,
  },
  props: {
    username: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>
</style>
