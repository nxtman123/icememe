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
          </router-link>
          <div class="text-caption">
            {{ displayDate }}
          </div>
        </div>
        <q-btn-group outline>
          <q-btn
            outline
            icon="arrow_downward"
          />
          <q-btn
            outline
            class="vote-number"
            :ripple="false"
          >
            {{ votesTotal }}
          </q-btn>
          <q-btn
            outline
            icon="arrow_upward"
          />
        </q-btn-group>
        <q-btn
          outline
          icon="mode_comment"
          :to="{ name: 'meme', params: { memeId, slug: slugTitle }}"
        >
          {{ commentCount }}
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from 'moment';
import slugify from 'slugify';

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
    commentCount: {
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
    slugTitle() {
      return slugify(this.title);
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
  padding: 0

</style>
