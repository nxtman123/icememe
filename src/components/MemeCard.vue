<template>
  <q-card class="q-ma-xs meme-card">
    <img
      :src="cloudinaryUrl"
      :alt="title"
    >
    <q-card-section>
      <div class="text-h6">
        {{ title }}
      </div>
      <div class="row justify-between">
        <div>
          <router-link
            :to="{ name: 'user', params: { username: username } }"
            class="author"
          >
            <div class="text-subtitle2">
              {{ username }}
            </div>
            <div class="text-caption">
              {{ displayDate }}
            </div>
          </router-link>
        </div>
        <div class="row justify-center items-center">
          <q-btn-group outline>
            <q-btn
              outline
              icon="arrow_downward"
            />
            <q-btn
              outline
              icon="arrow_upward"
            />
          </q-btn-group>
          <div class="vote-number text-body1">
            {{ votesTotal }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from 'moment';

export default {
  name: 'MemeCard',
  props: {
    memeId: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Number,
      default: 0,
    },
    username: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    cloudinaryUrl: {
      type: String,
      default: '',
    },
    dateCreated: {
      type: Number,
      default: 0,
    },
    votesTotal: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  computed: {
    displayDate() {
      return moment.unix(this.dateCreated).calendar(null, { sameElse: 'YYYY-MM-DD' });
    },
  },
};
</script>

<style lang="stylus">
@import '~quasar-variables'

.meme-card
  width: 100%
  max-width: 375px

.author
  color: black
  text-decoration: none
  &:hover
    text-decoration: underline

.vote-number
  padding: 6px

</style>
