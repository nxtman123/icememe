<template>
  <q-page class="page-frame">
    <div class="text-h6 q-py-md">
      {{ title }}
    </div>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12 col-sm-6 column justify-start">
        <q-img
          spinner-color="primary"
          :src="cloudinaryUrl"
          :alt="title"
          class="q-mb-sm"
        />
        <meme-metadata
          :author-username="authorUsername"
          :date-created="dateCreated"
        />
        <div class="row justify-between">
          <vote-buttons
            class="q-mb-sm q-mr-sm"
            :vote-total="voteTotal"
            :user-vote="userVote"
          />
          <div class="row items-center self-stretch q-mb-sm">
            <q-icon
              name="comment"
              left
              size="24px"
            />
            <div class="text-subtitle2">
              {{ comments.length }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 column justify-start">
        <form
          class="row q-mb-md"
          @submit.prevent="addComment"
        >
          <q-input
            v-model="draftComment"
            class="col-grow"
            outlined
            placeholder="Write a comment..."
          >
            <template v-slot:append>
              <q-btn
                type="submit"
                round
                flat
                icon="send"
                :color="draftComment ? 'primary' : undefined"
                :disable="!draftComment"
              />
            </template>
          </q-input>
        </form>
        <comment-card
          v-for="comment in comments"
          :key="comment.commentId"
          v-bind="comment"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import slugify from 'slugify';

import VoteButtons from '../components/VoteButtons';
import MemeMetadata from '../components/MemeMetadata';
import CommentCard from '../components/CommentCard';

export default {
  name: 'PageMeme',
  components: {
    'vote-buttons': VoteButtons,
    'meme-metadata': MemeMetadata,
    'comment-card': CommentCard,
  },
  data() {
    return {
      draftComment: '',
      memeId: 0,
      authorUsername: 'icedoge',
      title: 'Quasar is important, I promise',
      cloudinaryUrl: 'https://matthewstrom.com/images/ds-0.jpg',
      dateCreated: 1554145159,
      voteTotal: 54323,
      userVote: 'up',
      comments: [
        {
          commentId: 0,
          username: 'frostfox',
          dateCreated: 1554145259,
          text: 'first!',
        },
        {
          commentId: 1,
          username: 'johncena',
          dateCreated: 1554145289,
          text: 'I don\'t see it',
        },
        {
          commentId: 2,
          username: 'frostfox',
          dateCreated: 1554145329,
          text: 'bahaha',
        },
        {
          commentId: 3,
          username: 'harambe',
          dateCreated: 1554145429,
          text: 'never forget',
        },
      ],
    };
  },
  computed: {
    slugTitle() {
      return slugify(this.title, { remove: /[*+~,.()'"!:@]/g });
    },
  },
  methods: {
    addComment() {
      // eslint-disable-next-line no-alert
      alert(`new comment: "${this.draftComment}"`);

      this.draftComment = '';
    },
  },
};
</script>

<style>
</style>
