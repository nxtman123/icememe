<template>
  <div class="col-12 col-sm-6 col-md-4">
    <q-card>
      <router-link
        :to="{ name: 'meme', params: { memeId, slug: slugTitle }}"
        style="box-sizing: inherhit;"
      >
        <q-img
          :src="cloudinaryUrl"
          :alt="title"
        />
      </router-link>
      <q-card-section class="q-pb-sm">
        <router-link
          class="text-h6 title"
          :to="{ name: 'meme', params: { memeId, slug: slugTitle }}"
        >
          {{ title }}
        </router-link>
        <div class="row justify-between">
          <router-link
            :to="{ name: 'user', params: { username: authorUsername } }"
            class="author"
          >
            <div class="text-subtitle2 q-py-sm">
              {{ authorUsername }}
            </div>
          </router-link>
          <div class="text-caption q-py-sm">
            {{ displayDate }}
          </div>
        </div>
        <div class="row justify-between">
          <q-btn-toggle
            outline
            class="q-mb-sm"
            :value="userVote"
            :options="[
              { icon: 'arrow_downward', label: downVotes, value: 'down'},
              { icon: 'arrow_upward', label: upVotes, value: 'up'},
            ]"
          />
          <q-btn
            outline
            class="q-mb-sm"
            icon-right="mode_comment"
            :to="{ name: 'meme', params: { memeId, slug: slugTitle }}"
          >
            {{ commentCount }}
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </div>
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
    authorUsername: {
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
    downVotes: {
      type: Number,
      default: 0,
    },
    upVotes: {
      type: Number,
      default: 0,
    },
    userVote: {
      type: String,
      default: null,
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
      return slugify(this.title, { remove: /[*+~.()'"!:@]/g });
    },
  },
};
</script>

<style lang="stylus">
@import '~quasar-variables'

.title
  color: black
  text-decoration: none

.author
  color: black
  text-decoration: none
  &:hover
    text-decoration: underline

</style>
