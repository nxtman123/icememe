<template>
  <div class="col-12 col-sm-6 col-md-4">
    <q-card>
      <router-link
        class="title"
        :to="{ name: 'meme', params: { memeId, slug: slugTitle }}"
        style="box-sizing: inherhit;"
      >
        <q-card-section class="text-h6">
          {{ title }}
        </q-card-section>
        <q-img
          spinner-color="primary"
          :src="cloudinaryUrl"
          :alt="title"
        />
      </router-link>
      <q-card-section class="q-pb-sm">
        <div class="row justify-between">
          <router-link
            :to="{ name: 'user', params: { username: authorUsername } }"
            class="author-link"
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
              { icon: 'arrow_upward', label: upVotes, value: 'up'},
              { icon: 'arrow_downward', label: downVotes, value: 'down'},
            ]"
          />
          <q-btn
            outline
            class="q-mb-sm"
            icon="comment"
            :label="commentCount"
            :to="{ name: 'meme', params: { memeId, slug: slugTitle }, hash: '#comments' }"
          />
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
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
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
  computed: {
    displayDate() {
      return moment.unix(this.dateCreated).calendar(null, { sameElse: 'YYYY-MM-DD' });
    },
    slugTitle() {
      return slugify(this.title, { remove: /[*+~,.()'"!:@]/g });
    },
  },
};
</script>

<style lang="stylus">
@import '~quasar-variables'

.title
  color: black
  text-decoration: none
  outline: none
  &:focus
    text-decoration: underline

</style>
