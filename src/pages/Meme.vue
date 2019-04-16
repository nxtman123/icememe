<template>
  <q-page class="page-frame">
    <div class="text-h6 q-py-md">
      {{ meme.title }}
    </div>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12 col-sm-6 column justify-start">
        <q-img
          spinner-color="primary"
          :src="meme.cloudinaryUrl"
          :alt="meme.title"
          class="q-mb-sm"
        />
        <meme-metadata
          :username="meme.username"
          :date-created="meme.dateCreated"
        />
        <div class="row justify-between">
          <vote-buttons
            class="q-mb-sm q-mr-sm"
            :meme-id="memeId"
            :up-votes="meme.upVotes"
            :down-votes="meme.downVotes"
            :user-vote="meme.userVote"
          />
          <div class="row items-center self-stretch q-mb-sm">
            <q-icon
              name="comment"
              left
              size="24px"
            />
            <div class="text-subtitle2">
              {{ meme.commentCount || 0 }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 column justify-start">
        <form
          v-if="loggedIn"
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
        <q-infinite-scroll
          :offset="250"
          :disable="!earlierComments"
          @load="loadOlderComments"
        >
          <comment-card
            v-for="comment in sortedComments"
            :key="comment.commentId"
            v-bind="comment"
          />

          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner
                color="primary"
                size="40px"
              />
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

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
  props: {
    memeId: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      meme: {
        title: '',
        cloudinaryUrl: '',
        username: '',
        dateCreated: '',
        upVotes: 0,
        downVotes: 0,
        userVote: null,
        commentCount: 0,
      },
      draftComment: '',
      comments: [],
      earlierComments: true,
    };
  },
  computed: {
    ...mapGetters([
      'loggedIn',
    ]),
    slugTitle() {
      return slugify(this.title, { remove: /[*+~,.()'"!:@]/g });
    },
    sortedComments() {
      return this.comments.slice().sort((a, b) => (a.commentId < b.commentId));
    },
    earliestComment() {
      return this.comments.length
        ? this.comments.reduce((eId, c) => Math.min(eId, c.commentId), Infinity)
        : 0;
    },
  },
  mounted() {
    this.$socket.emit('getMeme', this.memeId);
  },
  beforeDestroy() {
    this.$socket.emit('leaveMeme', this.meme.memeId);
  },
  methods: {
    addComment() {
      if (this.draftComment) {
        this.$socket.emit('addComment', {
          memeId: this.memeId,
          text: this.draftComment,
        });
      }
    },
    loadOlderComments(index, done) {
      this.$socket.emit('getMemeComments', this.memeId, this.earliestComment, (commentsResult) => {
        if (commentsResult.isSuccessful) {
          if (commentsResult.value.length) {
            this.comments = this.comments.concat(commentsResult.value);
          } else {
            this.earlierComments = false;
          }
        } else {
          this.$q.notify(commentsResult.value);
        }
        done();
      });
    },
  },
  sockets: {
    getMeme(memeResult) {
      if (memeResult.isSuccessful) {
        this.meme = {
          ...this.meme,
          ...memeResult.value,
        };
      } else {
        this.$q.notify(memeResult.value);
      }
    },
    addComment(commentResult) {
      if (commentResult.isSuccessful) {
        this.draftComment = '';
      } else {
        this.$q.notify(commentResult.value);
      }
    },
    newLiveComment(newComment) {
      if (newComment.memeId === this.meme.memeId) {
        this.comments = [newComment, ...this.comments];
        this.meme.commentCount += 1;
      }
    },
  },
};
</script>

<style>
</style>
