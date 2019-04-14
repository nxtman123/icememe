<template>
  <div class="col-12 col-sm-6 col-md-4">
    <q-card>
      <router-link
        class="title"
        :to="{ name: 'meme', params: { meme_id, slug: slugTitle }}"
        style="box-sizing: inherhit;"
      >
        <q-card-section class="text-h6">
          {{ title }}
        </q-card-section>
        <q-img
          spinner-color="primary"
          :src="cloudinary_url"
          :alt="title"
        />
      </router-link>
      <q-card-section class="q-pb-sm">
        <meme-metadata
          :author-username="username"
          :date-created="date_created"
        />
        <div class="row justify-between">
          <vote-buttons
            class="q-mb-sm q-mr-sm"
            :vote-total="voteTotal"
            :user-vote="userVote"
          />
          <q-btn
            outline
            class="q-mb-sm"
            icon="comment"
            :label="comment_count"
            :to="{ name: 'meme', params: { meme_id, slug: slugTitle }, hash: '#comments' }"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import slugify from 'slugify';

import VoteButtons from './VoteButtons';
import MemeMetadata from './MemeMetadata';

export default {
  name: 'MemeCard',
  components: {
    'vote-buttons': VoteButtons,
    'meme-metadata': MemeMetadata,
  },
  props: {
    meme_id: {
      type: Number,
      default: -1,
    },
    username: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    cloudinary_url: {
      type: String,
      default: '',
    },
    date_created: {
      type: String,
      default: '',
    },
    voteTotal: {
      type: Number,
      default: 0,
    },
    userVote: {
      type: String,
      default: null,
      validator: v => ['up', 'down', null].includes(v),
    },
    comment_count: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    slugTitle() {
      return slugify(this.title, { remove: /[*+~,.()'"!:@]/g });
    },
  },
};
</script>

<style lang="stylus">

.title
  color: black
  text-decoration: none
  outline: none
  &:focus
    text-decoration: underline

</style>
