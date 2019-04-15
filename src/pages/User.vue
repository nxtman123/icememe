<template>
  <q-layout>
    <q-page class="column justify-center page-frame">
      <span style="height: 40px" />
      <meme-collection
        :memes="memes"
        @load="loadMoreMemes"
      />
    </q-page>
    <q-page-sticky
      expand
      position="top"
      :offset="[0, 50]"
    >
      <q-toolbar class="bg-blue-grey-7 text-white">
        <q-toolbar-title>
          Posted by: {{ user }}
        </q-toolbar-title>
      </q-toolbar>
    </q-page-sticky>
  </q-layout>
</template>

<script>
import _ from 'underscore';
import MemeCollection from '../components/MemeCollection';

export default {
  name: 'PageUser',
  components: {
    'meme-collection': MemeCollection,
  },
  data() {
    return {
      user: this.$route.params.username,
      memes: [],
      earliestMeme: 0,
    };
  },
  methods: {
    loadMoreMemes(done) {
      setTimeout(() => {
        if (this.memes) {
          this.$socket.emit('getMemes', this.user, this.earliestMeme);
        }
        done();
      }, 1500);
    },
  },
  sockets: {
    getMemes(reply) {
      if (reply.value.length > 0) {
        reply.value.forEach((item) => {
          const upvotes = _.isUndefined(item.up_votes) ? 0 : item.up_votes;
          const downvotes = _.isUndefined(item.down_votes) ? 0 : item.down_votes;

          this.memes.push({
            memeId: item.meme_id,
            authorUsername: item.username,
            title: item.title,
            cloudinaryUrl: item.cloudinary_url,
            dateCreated: item.date_created,
            voteTotal: upvotes + downvotes,
            userVote: 'up',
            commentCount: item.commentCount,
          });
        });
        this.earliestMeme = reply.value[reply.value.length - 1].meme_id;
      }
    },
  },
};
</script>

<style>
</style>
