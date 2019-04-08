<template>
  <div class="row justify-between">
    <router-link
      :to="{ name: 'user', params: { username: authorUsername } }"
      class="author-link q-mb-sm q-mr-sm"
    >
      <div class="text-subtitle2">
        {{ authorUsername }}
      </div>
    </router-link>
    <div class="text-caption q-mb-sm">
      {{ displayDate }}
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'MemeMetadata',
  props: {
    authorUsername: {
      type: String,
      default: '',
    },
    dateCreated: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    displayDate() {
      return moment.unix(this.dateCreated).calendar(null, { sameElse: 'YYYY-MM-DD' });
    },
  },
};
</script>

<style lang="stylus">

.author-link
  color: inherit
  text-decoration: none
  outline: none
  &:hover, &:focus
    text-decoration: underline

</style>
