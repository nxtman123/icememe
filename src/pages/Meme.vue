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
              {{ commentCount || 0 }}
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
        <q-infinite-scroll
          :offset="250"
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
import _ from 'underscore';
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
      authorUsername: '',
      title: '',
      cloudinaryUrl: '',
      dateCreated: '',
      voteTotal: 0,
      userVote: 'up',
      commentCount: 0,
      comments: [],
      earliestComment: 0,
    };
  },
  computed: {
    slugTitle() {
      return slugify(this.title, { remove: /[*+~,.()'"!:@]/g });
    },
    sortedComments() {
      return this.comments.slice().sort((a, b) => (a.commentId < b.commentId));
    },
    memeId() {
      return this.$route.params.memeId;
    },
  },
  mounted() {
    this.$socket.emit('getMeme', this.memeId);
  },
  methods: {
    addComment() {
      if (this.draftComment) {
        // TODO replace with call to server
        this.$socket.emit('addComment', {
          meme_id: this.memeId,
          text: this.draftComment,
        });
        this.draftComment = '';
      }
    },
    loadOlderComments(index, done) {
      setTimeout(() => {
        if (this.comments) {
          this.$socket.emit('getMemeComments', this.memeId, this.earliestComment);
        }
        done();
      }, 2000);
    },
  },
  sockets: {
    getMeme(reply) {
      if (reply.isSuccessful) {
        const upvotes = _.isUndefined(reply.value.up_votes) ? 0 : reply.value.up_votes;
        const downvotes = _.isUndefined(reply.value.down_votes) ? 0 : reply.value.down_votes;

        this.authorUsername = reply.value.username;
        this.title = reply.value.title;
        this.cloudinaryUrl = reply.value.cloudinary_url;
        this.dateCreated = reply.value.date_created;
        this.voteTotal = upvotes + downvotes;
        this.commentCount = reply.value.comment_count;
      }
    },
    getMemeComments(reply) {
      if (reply.value.length > 0) {
        reply.value.forEach((item) => {
          this.comments.push({
            commentId: item.comment_id,
            username: item.username,
            dateCreated: item.date_created,
            text: item.text,
          });
        });

        this.earliestComment = reply.value[reply.value.length - 1].comment_id;
      }
    },
    newLiveComment(reply) {
      if (reply.length > 0) {
        reply.forEach((item) => {
          this.comments.unshift({
            commentId: item.comment_id,
            username: item.username,
            dateCreated: item.date_created,
            text: item.text,
          });
        });
      }
    },
  },
};
</script>

<style>
</style>
