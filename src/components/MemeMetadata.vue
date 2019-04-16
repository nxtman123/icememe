<template>
  <div class="row justify-between">
    <router-link
      v-if="username"
      :to="{ name: 'user', params: { username } }"
      class="author-link q-mb-sm q-mr-sm"
    >
      <div class="text-subtitle2">
        {{ username }}
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
    username: {
      type: String,
      default: '',
    },
    dateCreated: {
      type: String,
      default: '',
    },
  },
  computed: {
    displayDate() {
      return this.dateCreated
        ? moment(this.dateCreated).calendar(null, { sameElse: 'YYYY-MM-DD' })
        : '';
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
